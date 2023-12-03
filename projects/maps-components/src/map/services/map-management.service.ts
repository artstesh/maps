import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { MapRenderedEvent } from '../messages';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { ClearLayerCommand } from '../messages/commands/clear-layer.command';

@Injectable()
export class MapManagementService {
  private map?: Map;
  private layers: { [name: string]: Layer<VectorSource<any>> } = {};

  constructor(private postboy: MapPostboyService) {
    this.observeMapRender();
    this.observeAddLayer();
    this.observeRemoveLayer();
    this.observePlaceFeatures();
    this.observeClearLayer();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
    });
  }

  private observeClearLayer() {
    this.postboy.subscribe<ClearLayerCommand>(ClearLayerCommand.ID).subscribe((c) => {
      this.layers[c.layer]?.getSource()?.clear();
    });
  }

  private observeAddLayer() {
    this.postboy.subscribe<AddLayerCommand>(AddLayerCommand.ID).subscribe((c) => {
      console.log('dddd');
      if (!this.map) return;
      console.log('aaaaaaaaa');
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
