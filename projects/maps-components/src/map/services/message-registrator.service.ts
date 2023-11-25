import { Injectable } from '@angular/core';
import { MapPostboyService } from "./map-postboy.service";
import { ReplaySubject } from "rxjs";
import { MapRenderedEvent } from "../messages";
import { MapStateService } from "./map-state.service";
import { MapManagementService } from "./map-management.service";

@Injectable()
export class MessageRegistratorService {

  constructor(service: MapPostboyService) {
    service.register(MapRenderedEvent.ID, new ReplaySubject<MapRenderedEvent>(1));
  }
}
