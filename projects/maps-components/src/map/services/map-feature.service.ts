import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { Feature, Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { FitToPolygonsCommand, MapPointerMoveEvent, MapRenderedEvent } from '../messages';
import { FitToFeaturesCommand } from '../messages/commands/fit-to-features.command';
import { Geometry } from 'ol/geom';
import { createEmpty, extend } from 'ol/extent';
import { MapFeatureHoveredEvent } from '../messages/events/map-feature-hovered.event';
import { MapConstants } from '../models';

@Injectable()
export class MapFeatureService implements IPostboyDependingService {
  private map?: Map;
  private fitPolygonsWaiting?: FitToPolygonsCommand;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
    this.observeFitToFeatures();
    this.observeFitToPolygons();
    this.observePointerMove();
  }

  private observeMapRender() {
    this.postboy.sub(MapRenderedEvent).subscribe((m) => {
      this.map = m.map;
      if (this.fitPolygonsWaiting) this.postboy.fire(this.fitPolygonsWaiting);
    });
  }

  private observePointerMove() {
    this.postboy.sub(MapPointerMoveEvent).subscribe((ev) => {
      if (!this.map) return;
      let featureFound = false;
      this.map.forEachFeatureAtPixel(ev.point, (f) => {
        if (f instanceof Feature) {
          this.postboy.fire(new MapFeatureHoveredEvent(f as Feature<Geometry>, f.get(MapConstants.FeatureLayerName)));
          featureFound = true;
        }
        return true;
      });
      if (!featureFound) this.postboy.fire(new MapFeatureHoveredEvent(null, null));
    });
  }

  private observeFitToFeatures() {
    this.postboy.sub(FitToFeaturesCommand).subscribe((cmd) => {
      this.fitToGeometries(
        cmd.features.map((f) => f.getGeometry()!),
        cmd.zoomAfter,
      );
    });
  }

  private observeFitToPolygons() {
    this.postboy.sub(FitToPolygonsCommand).subscribe((cmd) => {
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
