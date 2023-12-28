import { Injectable } from '@angular/core';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { Vector as Source } from 'ol/source';
import { Vector as Layer } from 'ol/layer';
import { bbox } from 'ol/loadingstrategy';
import Polygon, { fromExtent } from 'ol/geom/Polygon';
import Cluster from 'ol/source/Cluster';
import { Geometry, Point } from 'ol/geom';
import { ClusterLayerManager } from './cluster-layer.manager';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { StyleFunction } from 'ol/style/Style';
import { Feature } from 'ol';
import { MapConstants } from '../../../models/map.constants';

@Injectable({
  providedIn: 'root',
})
export class ClusterLayerFactory {
  public build(settings: ClusterLayerSettings, postboy: MapPostboyService): ClusterLayerManager {
    const source = new Source({
      strategy: settings.bbox ? bbox : undefined,
    });
    const cluster = new Cluster({
      distance: settings.distance,
      source: source,
      geometryFunction: (feature) => {
        const geom = feature.getGeometry();
        if (geom?.getType() == 'Point') {
          return geom as Point;
        } else if (geom?.getType() == 'Polygon') {
          return (geom as Polygon)?.getInteriorPoint();
        } else if (geom?.getType() == 'MultiPolygon') {
          return fromExtent(geom.getExtent())?.getInteriorPoint();
        }
        return undefined as any;
      },
    });
    const layer = new Layer({
      source: cluster,
      maxZoom: settings.maxZoom || undefined,
      minZoom: settings.minZoom || undefined,
      zIndex: settings.zIndex || 0,
    });
    layer.setStyle(this.styleFunc(settings));
    layer.set('name', settings.name);
    return new ClusterLayerManager(settings, layer, postboy);
  }

  styleFunc(settings: ClusterLayerSettings): StyleFunction {
    return (feature) => {
      const features = feature.get('features') as Feature<Geometry>[];
      if (!settings.style) return undefined;
      return settings.style(features.map((f) => ({ id: f.getId()!, ...f.get(MapConstants.FeatureInfo) })));
    };
  }
}
