import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../messages';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { ClearLayerCommand } from '../messages/commands/clear-layer.command';

@Injectable()
export class MessageRegistratorService {
  constructor(service: MapPostboyService) {
    service.register(MapRenderedEvent.ID, new ReplaySubject<MapRenderedEvent>(1));
    service.register(AddLayerCommand.ID, new Subject<AddLayerCommand>());
    service.register(PlaceLayerFeaturesCommand.ID, new ReplaySubject<PlaceLayerFeaturesCommand>(1));
    service.register(RemoveLayerCommand.ID, new Subject<RemoveLayerCommand>());
    service.register(ClearLayerCommand.ID, new Subject<ClearLayerCommand>());
  }
}
