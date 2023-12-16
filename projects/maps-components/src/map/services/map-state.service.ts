import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapRenderedEvent } from '../messages';
import { MapPostboyService } from './map-postboy.service';
import { IPostboyDependingService } from "@artstesh/postboy";

@Injectable()
export class MapStateService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {
  }

  up(): void {
    this.postboy.subscribe<Map>(MapRenderedEvent.ID).subscribe((m) => (this.map = m));
  }
}
