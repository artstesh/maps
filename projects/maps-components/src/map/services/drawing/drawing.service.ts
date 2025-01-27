import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapPostboyService } from '../map-postboy.service';
import { StartDrawingCommand } from '../../messages/commands/start-drawing.command';
import { CancelDrawingCommand } from '../../messages/commands/cancel-drawing.command';
import { first } from 'rxjs/operators';
import { DrawingFinishedEvent } from '../../messages/events/drawing-finished.event';
import { Subscription } from 'rxjs';
import { MapRenderedEvent } from '../../messages';
import { GetLayerQuery } from '../../messages/queries/get-layer.query';
import { MapConstants } from '../../models/map.constants';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Vector as Source } from 'ol/source';
import { Draw } from 'ol/interaction';
import { FeatureOutputFormat, PolygonModel } from '../../models';
import { Map } from 'ol';
import { DrawEvent } from 'ol/interaction/Draw';
import { Geometry } from 'ol/geom';
import { GeoJSON, WKT } from 'ol/format';
import { DrawSelectionAreaCommand } from '../../messages/commands/draw-selection-area.command';
import { GetFeaturesInAreaQuery } from '../../messages/queries/get-features-in-area.query';
import { IIdentified } from '../../models/i-identified';
import { GenerateDrawExecutor } from '../../messages/executors/generate-draw.executor';
import { Dictionary } from '@artstesh/collections';

@Injectable()
export class DrawingService implements IPostboyDependingService {
  private drawInteraction?: Draw;
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeDrawing();
    this.observeSelectArea();
    this.observeMapRender();
  }

  private observeSelectArea() {
    this.postboy.sub(DrawSelectionAreaCommand).subscribe((ev) => {
      this.postboy.fireCallback(new StartDrawingCommand(ev.type, ev.style), (r) => {
        if (!r) {
          ev.finish(new Dictionary<IIdentified[]>());
          return;
        }
        const area = PolygonModel.fromGeoJson(1, r).feature.getGeometry()!;
        this.postboy.fireCallback(new GetFeaturesInAreaQuery(area, ev.ignore), (result) => ev.finish(result));
      });
    });
  }

  private observeDrawing() {
    this.postboy.sub(StartDrawingCommand).subscribe((ev) => {
      this.draw((l) => {
        if (!l || !this.map) {
          this.clearInteraction(l);
          return;
        }
        const cancelSub = this.observeCancelation(ev, l);
        this.drawInteraction = this.postboy.exec(new GenerateDrawExecutor(l, ev.style, ev.type))!;
        this.map?.addInteraction(this.drawInteraction);
        this.drawInteraction.on('drawend', (evt: DrawEvent) => {
          cancelSub.unsubscribe();
          this.onEnd(evt, ev, l);
        });
      });
    });
  }

  private onEnd(evt: DrawEvent, command: StartDrawingCommand, layer: Layer<VectorSource<Geometry>>): void {
    command.finish(
      command.format === FeatureOutputFormat.GeoJson
        ? new GeoJSON().writeFeature(evt.feature)
        : new WKT().writeFeature(evt.feature),
    );
    this.clearInteraction(layer);
  }

  private observeMapRender() {
    this.postboy.sub(MapRenderedEvent).subscribe((m) => {
      this.map = m.map;
    });
  }

  private draw(action: (layer: Layer<VectorSource<any>> | null) => void): void {
    this.postboy.fireCallback(new GetLayerQuery(MapConstants.DrawingLayerId), (l) => action(l));
  }

  private observeCancelation(ev: StartDrawingCommand, layer: Layer<VectorSource<any>> | null): Subscription {
    return this.postboy
      .sub(CancelDrawingCommand)
      .pipe(first())
      .subscribe(() => {
        ev.finish(null);
        this.clearInteraction(layer);
      });
  }

  private clearInteraction(layer: Layer<Source<Geometry>> | null): void {
    if (!!this.drawInteraction) {
      this.map?.removeInteraction(this.drawInteraction);
      layer?.setSource(new Source({}));
    }
    setTimeout(() => this.postboy.fire(new DrawingFinishedEvent()), 300);
  }
}
