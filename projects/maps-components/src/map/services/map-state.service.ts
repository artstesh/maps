import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapRenderedEvent } from '../messages';
import { MapPostboyService } from './map-postboy.service';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapMoveEndEvent } from '../messages/events/map-move-end.event';

@Injectable()
export class MapStateService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((ev) => {
      this.map = ev.map;
      this.map?.on('moveend', () => {
        const zoom = Math.floor(this.map?.getView().getZoom() || -1);
        const extent = this.map?.getView().calculateExtent() || [];
        this.postboy.fire(new MapMoveEndEvent(zoom, extent));
      });
    });
  }
}
