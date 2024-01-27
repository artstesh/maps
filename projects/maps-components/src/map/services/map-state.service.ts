import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapRenderedEvent, SetMapCenterCommand } from '../messages';
import { MapPostboyService } from './map-postboy.service';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapMoveEndEvent } from "../messages";
import { first } from "rxjs/operators";

@Injectable()
export class MapStateService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRendering();
    this.observeCenter();
  }

  private observeMapRendering() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).pipe(first()).subscribe((ev) => {
      this.map = ev.map;
      this.map?.on('moveend', () => {
        const zoom = Math.floor(this.map?.getView().getZoom() || -1);
        const extent = this.map?.getView().calculateExtent() || [];
        this.postboy.fire(new MapMoveEndEvent(zoom, extent));
      });
    });
  }

  private observeCenter() {
    this.postboy.subscribe<SetMapCenterCommand>(SetMapCenterCommand.ID).subscribe((c) => {
      this.map?.getView().setCenter([c.lng, c.lat]);
      if (c.zoom) this.map?.getView().setZoom(c.zoom);
    });
  }
}
