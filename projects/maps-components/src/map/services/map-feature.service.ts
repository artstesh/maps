import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { MapRenderedEvent } from '../messages';
import { FitToFeaturesCommand } from '../messages/commands/fit-to-features.command';
import { Geometry } from 'ol/geom';
import { createEmpty, extend } from 'ol/extent';

@Injectable()
export class MapFeatureService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
    this.observeFitToFeatures();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
    });
  }

  private observeFitToFeatures() {
    this.postboy.subscribe<FitToFeaturesCommand>(FitToFeaturesCommand.ID).subscribe((m) => {
      this.fitToGeometries(
        m.features.map((f) => f.getGeometry()!),
        m.zoomAfter,
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
