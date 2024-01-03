import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { MapRenderedEvent } from '../messages';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { AddTileCommand } from '../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../messages/commands/remove-tile.command';
import { IPostboyDependingService } from '@artstesh/postboy';
import Cluster from 'ol/source/Cluster';
import { GetLayerQuery } from '../messages/queries/get-layer.query';
import { GetFeaturesInAreaQuery } from '../messages/queries/get-features-in-area.query';
import { IIdentified } from '../models/i-identified';
import { Dictionary } from '../models';
import { MapConstants } from '../models/map.constants';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';

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
    this.observeRemoveTile();
    this.observeLayerQuery();
    this.observeFeaturesInArea();
  }

  private observeRemoveTile() {
    this.postboy.subscribe<RemoveTileCommand>(RemoveTileCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
  }

  private observeLayerQuery() {
    this.postboy.subscribe<GetLayerQuery>(GetLayerQuery.ID).subscribe((ev) => ev.finish(this.layers.take(ev.name)));
  }

  private observeAddTile() {
    this.postboy.subscribe<AddTileCommand>(AddTileCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.map.addLayer(c.layer);
    });
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
    });
  }

  private observeAddLayer() {
    this.postboy.subscribe<AddLayerCommand>(AddLayerCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.layers.put(c.layer.get('name'), c.layer);
      this.map.addLayer(c.layer);
    });
  }

  private observePlaceFeatures() {
    this.postboy.subscribe<PlaceLayerFeaturesCommand>(PlaceLayerFeaturesCommand.ID).subscribe((c) => {
      if (!this.layers.has(c.layer)) return;
      let source = this.layers.take(c.layer)!.getSource();
      if (!!(source as any)['getSource']) source = (source as any)?.getSource();
      source?.clear();
      source?.addFeatures(c.features);
    });
  }

  private observeRemoveLayer() {
    this.postboy.subscribe<RemoveLayerCommand>(RemoveLayerCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.layers.rmv(c.layer.get('name'));
      this.map.removeLayer(c.layer);
    });
  }

  private observeFeaturesInArea() {
    this.postboy.subscribe<GetFeaturesInAreaQuery>(GetFeaturesInAreaQuery.ID).subscribe((qr) => {
      let result = new Dictionary<IIdentified[]>();
      this.layers.forEach((l) => {
        let layerName = l.get('name');
        if (qr.ignore.has(layerName) || layerName === MapConstants.DrawingLayerId) return;
        let source = l.getSource();
        if (!!(source as any)['getSource']) source = (source as any)?.getSource();
        result.put(
          layerName,
          this.postboy.execute(new FilterFeaturesInAreaExecutor(qr.area, source?.getFeatures() ?? [])),
        );
      });
      qr.finish(result);
    });
  }
}
