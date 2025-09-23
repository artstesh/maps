import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { Modify, Translate } from 'ol/interaction';
import { Collection, Feature, Map } from 'ol';
import { MapPostboyService } from '../map-postboy.service';
import { MapRenderedEvent } from '../../messages';
import { FeatureOutputFormat } from '../../models';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';
import { GeoJSON, WKT } from 'ol/format';
import { GetLayerQuery } from '../../messages/queries/get-layer.query';
import { MapConstants } from '../../models/map.constants';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Vector as Source } from 'ol/source';
import { CancelFeatureModificationCommand } from '../../messages/commands/cancel-feature-modification.command';
import { ModifyFeatureCommand } from '../../messages/commands/modify-feature.command';

@Injectable()
export class FeatureModificationService implements IPostboyDependingService {
  private modify?: Modify;
  private translate?: Translate;
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeModification();
    this.observeMapRender();
  }

  private observeModification() {
    this.postboy.sub(ModifyFeatureCommand).subscribe((ev) => {
      this.defineLayer((l) => {
        if (!l || !this.map) {
          this.clearInteraction(l);
          return;
        }
        this.observeCancelation(ev, l);
        this.initFeature(l, ev.model.feature);
        this.addModify(ev);
        if (ev.draggable) this.addDragging(ev);
      });
    });
  }

  private initFeature(layer: Layer<VectorSource<Geometry>>, feature: Feature<Geometry>): void {
    layer.getSource()?.clear();
    layer.getSource()?.addFeature(feature);
  }

  private addModify(command: ModifyFeatureCommand): void {
    this.modify = new Modify({
      features: new Collection([command.model.feature]),
      style: command.style,
    });
    this.modify.on('modifyend', () => {
      this.onModified(command);
      command.model.feature.changed();
    });
    this.map?.addInteraction(this.modify);
  }

  private addDragging(command: ModifyFeatureCommand): void {
    this.translate = new Translate({
      features: new Collection([command.model.feature]),
      condition: (ev) => {
        const clone = command.model.feature.clone();
        clone.getGeometry()?.scale(0.999);
        return clone.getGeometry()!.intersectsCoordinate(ev.coordinate);
      },
    });
    this.translate.on('translateend', () => this.onModified(command));
    this.map?.addInteraction(this.translate);
  }

  private onModified(command: ModifyFeatureCommand): void {
    command.next(
      command.format === FeatureOutputFormat.GeoJson
        ? new GeoJSON().writeFeature(command.model.feature)
        : command.format === FeatureOutputFormat.WKT
        ? new WKT().writeFeature(command.model.feature)
        : new GeoJSON().writeGeometry(command.model.feature.getGeometry()!),
    );
  }

  private observeMapRender() {
    this.postboy.sub(MapRenderedEvent).subscribe((m) => {
      this.map = m.map;
    });
  }

  private defineLayer(action: (layer: Layer<VectorSource<any>> | null) => void): void {
    this.postboy.fireCallback(new GetLayerQuery(MapConstants.DrawingLayerId), (l) => action(l));
  }

  private observeCancelation(ev: ModifyFeatureCommand, layer: Layer<VectorSource<any>> | null): Subscription {
    return this.postboy
      .sub(CancelFeatureModificationCommand)
      .pipe(first())
      .subscribe(() => {
        ev.finish(null);
        this.clearInteraction(layer);
      });
  }

  private clearInteraction(layer: Layer<Source<Geometry>> | null): void {
    layer?.getSource()?.clear();
    if (this.modify) this.map?.removeInteraction(this.modify);
    if (this.translate) this.map?.removeInteraction(this.translate);
  }
}
