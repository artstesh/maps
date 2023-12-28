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
import { Draw, Snap } from 'ol/interaction';
import { DrawingType, FeatureOutputFormat } from '../../models';
import { Map } from 'ol';
import { DrawEvent } from 'ol/interaction/Draw';
import { GeoJSON, WKT } from 'ol/format';
import { Geometry } from "ol/geom";

@Injectable()
export class DrawingService implements IPostboyDependingService {
  private drawInteraction?: Draw;
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.postboy.subscribe<StartDrawingCommand>(StartDrawingCommand.ID).subscribe((ev) => {
      this.draw((l) => {
        if (!l || !this.map) {
          this.clearInteraction(l);
          return;
        }
        const cancelSub = this.observeCancelation(ev, l);
        this.drawInteraction = new Draw({
          source: l.getSource()!,
          type: DrawingType[ev.type] as any,
          style: ev.style
        });
        this.map.addInteraction(this.drawInteraction);
        this.drawInteraction.on('drawend', (evt: DrawEvent) => {
          cancelSub.unsubscribe();
          this.onEnd(evt, ev, l);
        });
      });
    });
    this.observeMapRender();
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
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
    });
  }

  private draw(action: (layer: Layer<VectorSource<any>> | null) => void): void {
    const query = new GetLayerQuery(MapConstants.DrawingLayerId);
    query.result.subscribe((l) => action(l));
    this.postboy.fire(query);
  }

  private observeCancelation(ev: StartDrawingCommand,layer: Layer<VectorSource<any>> | null): Subscription {
    return this.postboy
      .subscribe<CancelDrawingCommand>(CancelDrawingCommand.ID)
      .pipe(first())
      .subscribe(() => {
        ev.finish(null);
        this.clearInteraction(layer);
      });
  }

  private clearInteraction(layer: Layer<Source<Geometry>> | null): void {
    if (!!this.drawInteraction) {
      this.map?.removeInteraction(this.drawInteraction);
      layer?.setSource(new Source({}))
    }
    setTimeout(() => this.postboy.fire(new DrawingFinishedEvent()), 300);
  }
}
