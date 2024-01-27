import { Injectable } from '@angular/core';
import { Map } from 'ol';
import { MapPostboyService } from '../map-postboy.service';
import { AddControlCommand, MapRenderedEvent, RemoveControlCommand } from '../../messages';
import { IPostboyDependingService } from "@artstesh/postboy";
import { first } from "rxjs/operators";

@Injectable()
export class ControlsService implements IPostboyDependingService{
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).pipe(first()).subscribe((m) => {
      this.map = m.map;
      this.observeAdding();
      this.observeRemoving();
    });
  }

  private observeAdding() {
    this.postboy.subscribe<AddControlCommand>(AddControlCommand.ID).subscribe((c) => this.map?.addControl(c.item));
  }

  private observeRemoving() {
    this.postboy
      .subscribe<RemoveControlCommand>(RemoveControlCommand.ID)
      .subscribe((c) => this.map?.removeControl(c.item));
  }
}
