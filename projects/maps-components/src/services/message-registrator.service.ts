import { Injectable } from '@angular/core';
import { MapPostboyService } from "./map-postboy.service";
import { MapRenderedEvent } from "../messages/events/map-rendered.event";
import { ReplaySubject } from "rxjs";

@Injectable()
export class MessageRegistratorService {

  constructor(service: MapPostboyService) {
    service.register(MapRenderedEvent.ID, new ReplaySubject<MapRenderedEvent>(1));
  }
}
