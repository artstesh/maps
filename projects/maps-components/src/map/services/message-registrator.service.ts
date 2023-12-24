import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../messages';
import { AddLayerCommand } from '../messages/commands/add-layer.command';
import { PlaceLayerFeaturesCommand } from '../messages/commands/place-layer-features.command';
import { RemoveLayerCommand } from '../messages/commands/remove-layer.command';
import { AddTileCommand } from '../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../messages/commands/remove-tile.command';
import { PostboyAbstractRegistrator } from '@artstesh/postboy';
import { MapManagementService } from './map-management.service';
import { MapStateService } from './map-state.service';
import { MapClickService } from './map-click.service';
import { MapClickEvent } from '../messages/events/map-click.event';
import { CloseTooltipCommand } from '../messages/commands/close-tooltip.command';
import { MapFeatureService } from './map-feature.service';
import { FitToFeaturesCommand } from '../messages/commands/fit-to-features.command';

@Injectable()
export class MessageRegistratorService extends PostboyAbstractRegistrator {
  constructor(
    service: MapPostboyService,
    management: MapManagementService,
    state: MapStateService,
    feature: MapFeatureService,
    interaction: MapClickService,
  ) {
    super(service);
    this.registerServices([management, state, interaction, feature]);
  }
  protected _up(): void {
    this.registerReplay<MapRenderedEvent>(MapRenderedEvent.ID);
    this.registerReplay<PlaceLayerFeaturesCommand>(PlaceLayerFeaturesCommand.ID);
    this.registerSubject<AddLayerCommand>(AddLayerCommand.ID);
    this.registerSubject<RemoveLayerCommand>(RemoveLayerCommand.ID);
    this.registerSubject<AddTileCommand>(AddTileCommand.ID);
    this.registerSubject<RemoveTileCommand>(RemoveTileCommand.ID);
    this.registerSubject<MapClickEvent>(MapClickEvent.ID);
    this.registerSubject<CloseTooltipCommand>(CloseTooltipCommand.ID);
    this.registerSubject<FitToFeaturesCommand>(FitToFeaturesCommand.ID);
  }
}
