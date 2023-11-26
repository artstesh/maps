import { Injectable } from '@angular/core';
import { MapPostboyService } from "./map-postboy.service";
import { ReplaySubject, Subject } from "rxjs";
import { MapRenderedEvent } from "../messages";
import { MapStateService } from "./map-state.service";
import { MapManagementService } from "./map-management.service";
import { AddLayerCommand } from "../messages/commands/add-layer.command";

@Injectable()
export class MessageRegistratorService {

  constructor(service: MapPostboyService) {
    service.register(MapRenderedEvent.ID, new ReplaySubject<MapRenderedEvent>(1));
    service.register(AddLayerCommand.ID, new Subject<AddLayerCommand>());
  }
}
