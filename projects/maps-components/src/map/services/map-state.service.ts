import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapRenderedEvent } from '../messages';
import { MapPostboyService } from './map-postboy.service';

@Injectable()
export class MapStateService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {
    postboy.subscribe<Map>(MapRenderedEvent.ID).subscribe((m) => (this.map = m));
  }
}
