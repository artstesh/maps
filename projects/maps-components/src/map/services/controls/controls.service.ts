import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from '../map-postboy.service';
import { AddControlCommand, MapRenderedEvent, RemoveControlCommand } from '../../messages';
import { IPostboyDependingService } from '@artstesh/postboy';
import { first } from 'rxjs/operators';

@Injectable()
export class ControlsService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
  }

  private observeMapRender() {
    this.postboy
      .sub(MapRenderedEvent)
      .pipe(first())
      .subscribe((m) => {
        this.map = m.map;
        this.observeAdding();
        this.observeRemoving();
      });
  }

  private observeAdding() {
    this.postboy.sub(AddControlCommand).subscribe((c) => this.map?.addControl(c.item));
  }

  private observeRemoving() {
    this.postboy.sub(RemoveControlCommand).subscribe((c) => this.map?.removeControl(c.item));
  }
}
