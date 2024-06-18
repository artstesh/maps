import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapMoveEndEvent, MapRenderedEvent, SetMapCenterCommand } from '../messages';
import { MapPostboyService } from './map-postboy.service';
import { IPostboyDependingService } from '@artstesh/postboy';
import { first } from 'rxjs/operators';
import { MapPosition } from '../models';

@Injectable()
export class MapStateService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRendering();
    this.observeCenter();
  }

  public getMapPosition(): MapPosition | null {
    if (!this.map) return null;
    let [longitude, latitude] = this.map.getView().getCenter()!;
    const zoom = Math.floor(this.map.getView().getZoom()!);
    const extent = this.map.getView().calculateExtent();
    return { longitude, latitude, zoom, extent };
  }

  private observeMapRendering() {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(first())
      .subscribe((ev) => {
        this.map = ev.map;
        this.map?.on('moveend', () => {
          this.postboy.fire(new MapMoveEndEvent(this.getMapPosition()));
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
