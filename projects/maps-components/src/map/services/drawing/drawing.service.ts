import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapPostboyService } from '../map-postboy.service';
import { StartDrawingCommand } from '../../messages/commands/start-drawing.command';
import { CancelDrawingCommand } from '../../messages/commands/cancel-drawing.command';
import { first } from 'rxjs/operators';
import { DrawingFinishedEvent } from '../../messages/events/drawing-finished.event';
import { Subscription } from 'rxjs';
import BaseLayer from 'ol/layer/Base';
import { MapRenderedEvent } from '../../messages';
import { GetLayerQuery } from "../../messages/queries/get-layer.query";
import { MapConstants } from "../../models/map.constants";
import { Vector as Layer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";

@Injectable()
export class DrawingService implements IPostboyDependingService {
  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.postboy.subscribe<StartDrawingCommand>(StartDrawingCommand.ID).subscribe((ev) => {
      const cancelSub = this.observeCancelation(ev);
      this.draw(l => {

      });
    });
    this.observeMapRender();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {});
  }

  private draw(action: (layer: Layer<VectorSource<any> | Cluster> | null) => void): void {
    const query = new GetLayerQuery(MapConstants.DrawingLayerId);
    query.result.subscribe(l => action(l));
    this.postboy.fire(query);
  }

  private observeCancelation(ev: StartDrawingCommand): Subscription {
    return this.postboy
      .subscribe<CancelDrawingCommand>(CancelDrawingCommand.ID)
      .pipe(first())
      .subscribe(() => {
        ev.finish(null);
        this.postboy.fire(new DrawingFinishedEvent());
      });
  }
}
