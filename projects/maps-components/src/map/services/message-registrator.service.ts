import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../messages';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { AddTileCommand } from '../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../messages/commands/remove-tile.command';

@Injectable()
export class MessageRegistratorService {
  constructor(service: MapPostboyService) {
    service.register(MapRenderedEvent.ID, new ReplaySubject<MapRenderedEvent>(1));
    service.register(AddLayerCommand.ID, new Subject<AddLayerCommand>());
    service.register(PlaceLayerFeaturesCommand.ID, new ReplaySubject<PlaceLayerFeaturesCommand>(1));
    service.register(RemoveLayerCommand.ID, new Subject<RemoveLayerCommand>());
    service.register(AddTileCommand.ID, new Subject<AddTileCommand>());
    service.register(RemoveTileCommand.ID, new Subject<RemoveTileCommand>());
  }
}
