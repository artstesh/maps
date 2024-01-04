import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
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
import { MapMoveEndEvent } from '../messages/events/map-move-end.event';
import { CancelDrawingCommand } from '../messages/commands/cancel-drawing.command';
import { StartDrawingCommand } from '../messages/commands/start-drawing.command';
import { DrawingService } from './drawing/drawing.service';
import { GetLayerQuery } from '../messages/queries/get-layer.query';
import { DrawingFinishedEvent } from '../messages/events/drawing-finished.event';
import { DrawingGenerationService } from './drawing/drawing-generation.service';
import { FeatureService } from './feature.service';
import { GetFeaturesInAreaQuery } from '../messages/queries/get-features-in-area.query';
import { DrawSelectionAreaCommand } from '../messages/commands/draw-selection-area.command';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';
import { GenerateDrawExecutor } from '../messages/executors/generate-draw.executor';
import { FeatureModificationService } from './drawing/feature-modification.service';
import { CancelFeatureModificationCommand } from '../messages/commands/cancel-feature-modification.command';
import { ModifyFeatureCommand } from '../messages/commands/modify-feature.command';

@Injectable()
export class MessageRegistratorService extends PostboyAbstractRegistrator {
  constructor(
    service: MapPostboyService,
    management: MapManagementService,
    state: MapStateService,
    mapFeature: MapFeatureService,
    interaction: MapClickService,
    drawing: DrawingService,
    featureModification: FeatureModificationService,
  ) {
    super(service);
    this.registerServices([management, state, interaction, mapFeature, drawing, featureModification]);
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
    this.registerSubject<MapMoveEndEvent>(MapMoveEndEvent.ID);
    this.registerSubject<CancelDrawingCommand>(CancelDrawingCommand.ID);
    this.registerSubject<StartDrawingCommand>(StartDrawingCommand.ID);
    this.registerSubject<GetLayerQuery>(GetLayerQuery.ID);
    this.registerSubject<DrawingFinishedEvent>(DrawingFinishedEvent.ID);
    this.registerSubject<GetFeaturesInAreaQuery>(GetFeaturesInAreaQuery.ID);
    this.registerSubject<DrawSelectionAreaCommand>(DrawSelectionAreaCommand.ID);
    this.registerSubject<CancelFeatureModificationCommand>(CancelFeatureModificationCommand.ID);
    this.registerSubject<ModifyFeatureCommand>(ModifyFeatureCommand.ID);
    this.setExecutors();
  }

  private setExecutors() {
    this.registerExecutor(FilterFeaturesInAreaExecutor.ID, (e: FilterFeaturesInAreaExecutor) =>
      FeatureService.filterFeaturesInArea(e),
    );
    this.registerExecutor(GenerateDrawExecutor.ID, (e: GenerateDrawExecutor) => DrawingGenerationService.getDraw(e));
  }
}
