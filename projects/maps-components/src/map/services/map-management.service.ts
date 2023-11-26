import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { MapRenderedEvent } from '../messages';
import { AddLayerCommand } from "../messages/commands/add-layer.command";
import { RemoveLayerCommand } from "../messages/commands/remove-layer.command";

@Injectable()
export class MapManagementService {
  map?: Map;

  constructor(private postboy: MapPostboyService) {
    postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => (this.map = m.map));
    this.observeAddLayer();
  }

  private observeAddLayer() {
    this.postboy.subscribe<AddLayerCommand>(AddLayerCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.map.addLayer(c.layer);
    });
  }

  private observeRemoveLayer() {
    this.postboy.subscribe<RemoveLayerCommand>(RemoveLayerCommand.ID).subscribe((c) => {
      if (!this.map) return;
      this.map.removeLayer(c.layer);
    });
  }
}
