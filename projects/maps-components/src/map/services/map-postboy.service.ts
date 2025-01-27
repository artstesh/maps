import { Injectable } from '@angular/core';
import { PostboyService } from '@artstesh/postboy';
import { StartDrawingCommand } from '../messages/commands/start-drawing.command';
import { MapClickEvent } from '../messages';
import { DrawingFinishedEvent } from '../messages/events/drawing-finished.event';

@Injectable()
export class MapPostboyService extends PostboyService {
  constructor() {
    super();
    this.addLocker({
      locker: StartDrawingCommand.name,
      unlocker: DrawingFinishedEvent.name,
      locking: [MapClickEvent.name],
    });
  }
}
