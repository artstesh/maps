import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from "./map-postboy.service";
import { MapRenderedEvent } from "../messages";

@Injectable()
export class MapManagementService {
  map?: Map;

  constructor(private postboy: MapPostboyService) {
    postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => (this.map = m.map));
  }
}
