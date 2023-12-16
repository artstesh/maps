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
import { IPostboyDependingService } from "@artstesh/postboy";

@Injectable()
export class MapManagementService implements IPostboyDependingService {
  private map?: Map;
  private layers: { [name: string]: Layer<VectorSource<any>> } = {};

  constructor(private postboy: MapPostboyService) {
  }

  up(): void {
    this.observeMapRender();
    this.observeAddLayer();
    this.observeRemoveLayer();
    this.observePlaceFeatures();
    this.observeAddTile();
    this.observeRemoveTile();
  }

  private observeRemoveTile() {
    this.postboy.subscribe<RemoveTileCommand>(RemoveTileCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
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
      this.layers[c.layer.get('name')] = c.layer;
      this.map.addLayer(c.layer);
    });
  }

  private observePlaceFeatures() {
    this.postboy.subscribe<PlaceLayerFeaturesCommand>(PlaceLayerFeaturesCommand.ID).subscribe((c) => {
      if (!this.layers[c.layer]) return;
      this.layers[c.layer]?.getSource()?.clear();
      this.layers[c.layer].getSource()?.addFeatures(c.features);
    });
  }

  private observeRemoveLayer() {
    this.postboy.subscribe<RemoveLayerCommand>(RemoveLayerCommand.ID).subscribe((c) => {
      if (!this.map) return;
      delete this.layers[c.layer.get('name')];
      this.map.removeLayer(c.layer);
    });
  }
}
