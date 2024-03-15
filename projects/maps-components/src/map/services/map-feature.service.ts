import { Injectable } from '@angular/core';
import { IPostboyDependingService, PostboyGenericMessage } from '@artstesh/postboy';
import { Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { FitToPolygonsCommand, MapRenderedEvent } from '../messages';
import { FitToFeaturesCommand } from '../messages/commands/fit-to-features.command';
import { Geometry } from 'ol/geom';
import { createEmpty, extend } from 'ol/extent';

@Injectable()
export class MapFeatureService implements IPostboyDependingService {
  private map?: Map;
  private fitPolygonsWaiting?: FitToPolygonsCommand;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
    this.observeFitToFeatures();
    this.observeFitToPolygons();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
      if (this.fitPolygonsWaiting) this.postboy.fire(this.fitPolygonsWaiting);
    });
  }

  private observeFitToFeatures() {
    this.postboy.subscribe<FitToFeaturesCommand>(FitToFeaturesCommand.ID).subscribe((cmd) => {
      this.fitToGeometries(
        cmd.features.map((f) => f.getGeometry()!),
        cmd.zoomAfter,
      );
    });
  }

  private observeFitToPolygons() {
    this.postboy.subscribe<FitToPolygonsCommand>(FitToPolygonsCommand.ID).subscribe((cmd) => {
      if (!this.map) {
        this.fitPolygonsWaiting = cmd;
        return;
      }
      this.fitPolygonsWaiting = undefined;
      this.fitToGeometries(
        cmd.features.map((f) => f.feature.getGeometry()!),
        cmd.zoomAfter,
      );
    });
  }

  private fitToGeometries(geometries: Geometry[], zoomAfter: number): void {
    if (!geometries?.length || !this.map) return;
    const extent = createEmpty();
    geometries.forEach((g) => extend(extent, g.getExtent()));
    this.map.getView().fit(extent);
    this.map.getView().setZoom(this.map.getView().getZoom()! + zoomAfter);
  }
}
