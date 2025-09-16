import { Injectable } from '@angular/core';
import { Feature, Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { FilterFeaturesInPointExecutor, GetFeaturesInPointQuery, MapRenderedEvent } from '../messages';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { AddTileCommand } from '../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../messages/commands/remove-tile.command';
import { IPostboyDependingService } from '@artstesh/postboy';
import Cluster from 'ol/source/Cluster';
import { GetLayerQuery } from '../messages/queries/get-layer.query';
import { GetFeaturesInAreaQuery } from '../messages/queries/get-features-in-area.query';
import { IIdentified } from '../models/i-identified';
import { MapConstants } from '../models/map.constants';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';
import { Geometry } from 'ol/geom';
import { Dictionary } from '@artstesh/collections';
import { RemoveImageLayerCommand } from '../messages/commands/remove-image-layer.command';
import { AddImageLayerCommand } from '../messages/commands/add-image-layer.command';
import { AddRasterTileCommand } from "../messages/commands/add-raster-tile-command";
import { RemoveRasterTileCommand } from "../messages/commands/remove-raster-tile.command";

@Injectable()
export class MapManagementService implements IPostboyDependingService {
  private map?: Map;
  private layers = new Dictionary<Layer<VectorSource<any> | Cluster>>();

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
    this.observeAddLayer();
    this.observeRemoveLayer();
    this.observePlaceFeatures();
    this.observeAddTile();
    this.observeLayerQuery();
    this.observeFeaturesInArea();
    this.observeFeaturesInPoint();
    this.observeImageLayer();
  }

  private observeLayerQuery() {
    this.postboy.sub(GetLayerQuery).subscribe((ev) => ev.finish(this.layers.take(ev.name)));
  }

  private observeAddTile() {
    this.postboy.sub(AddTileCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.addLayer(c.layer);
    });
    this.postboy.sub(RemoveTileCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
    this.postboy.sub(AddRasterTileCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.addLayer(c.layer);
    });
    this.postboy.sub(RemoveRasterTileCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
  }

  private observeImageLayer() {
    this.postboy.sub(AddImageLayerCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.addLayer(c.layer);
    });
    this.postboy.sub(RemoveImageLayerCommand).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
  }

  private observeMapRender() {
    this.postboy.sub(MapRenderedEvent).subscribe((m) => {
      this.map = m.map;
    });
  }

  private observeAddLayer() {
    this.postboy.sub(AddLayerCommand).subscribe((c) => {
      if (!this.map) return;
      this.layers.put(c.layer.get('name'), c.layer);
      this.map.addLayer(c.layer);
    });
  }

  private observePlaceFeatures() {
    this.postboy.sub(PlaceLayerFeaturesCommand).subscribe((c) => {
      if (!this.layers.has(c.layer)) return;
      let source = this.layers.take(c.layer)!.getSource();
      if (!!(source as any)['getSource']) source = (source as any)?.getSource();
      source?.clear();
      !!c.features?.length && source?.addFeatures(c.features);
    });
  }

  private observeRemoveLayer() {
    this.postboy.sub(RemoveLayerCommand).subscribe((c) => {
      if (!this.map) return;
      this.layers.rmv(c.layer.get('name'));
      this.map.removeLayer(c.layer);
    });
  }

  private observeFeaturesInArea() {
    this.postboy.sub(GetFeaturesInAreaQuery).subscribe((qr) => {
      let result = new Dictionary<IIdentified[]>();
      this.forEachLayer((l, s) => {
        let features = this.postboy.exec<Feature<Geometry>[]>(
          new FilterFeaturesInAreaExecutor(qr.area, s?.getFeatures() ?? []),
        );
        result.put(
          l.get('name'),
          features.map((e) => ({ id: e.getId(), ...e.get(MapConstants.FeatureInfo) })),
        );
      }, qr.ignore);
      qr.finish(result);
    });
  }

  private observeFeaturesInPoint() {
    this.postboy.sub(GetFeaturesInPointQuery).subscribe((qr) => {
      let result = new Dictionary<IIdentified[]>();
      this.forEachLayer((l, s) => {
        let features = this.postboy.exec<Feature<Geometry>[]>(
          new FilterFeaturesInPointExecutor(qr.lat, qr.lng, s?.getFeatures() ?? []),
        );
        result.put(
          l.get('name'),
          features.map((e) => ({ id: e.getId(), ...e.get(MapConstants.FeatureInfo) })),
        );
      }, qr.ignore);
      qr.finish(result);
    });
  }

  private forEachLayer(
    action: (l: Layer<any>, s: VectorSource<any> | Cluster | null) => void,
    ignore: Set<string>,
  ): void {
    this.layers.forEach((l) => {
      let layerName = l.get('name');
      if (ignore.has(layerName) || layerName === MapConstants.DrawingLayerId) return;
      let source = l.getSource();
      if (!!(source as any)['getSource']) source = (source as any)?.getSource();
      action(l, source);
    });
  }
}
