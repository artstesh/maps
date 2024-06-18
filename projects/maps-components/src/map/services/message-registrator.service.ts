import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
import { FitToPolygonsCommand, MapRenderedEvent } from '../messages';
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
import { GenerateZoomControlExecutor } from '../messages/executors/generate-zoom-control.executor';
import { ZoomControlFactory } from '../map-plate/controls/map-control-zoom/zoom-control.factory';
import { RemoveControlCommand } from '../messages/commands/remove-control.command';
import { AddControlCommand } from '../messages/commands/add-control.command';
import { ControlsService } from './controls/controls.service';
import { SetMapCenterCommand } from '../messages/commands/set-map-center.command';
import { CalculateAreaExecutor } from '../messages/executors/calculate-area.executor';
import { GetMapPositionExecutor } from "../messages/executors/get-map-position.executor";

@Injectable()
export class MessageRegistratorService extends PostboyAbstractRegistrator {
  constructor(
    service: MapPostboyService,
    management: MapManagementService,
    private state: MapStateService,
    mapFeature: MapFeatureService,
    interaction: MapClickService,
    drawing: DrawingService,
    featureModification: FeatureModificationService,
    controls: ControlsService,
  ) {
    super(service);
    this.registerServices([management, state, interaction, mapFeature, drawing, featureModification, controls]);
  }

  protected _up(): void {
    this.registerReplay(MapRenderedEvent.ID);
    this.registerReplay(PlaceLayerFeaturesCommand.ID);
    this.registerReplay(RemoveControlCommand.ID);
    this.registerReplay(AddControlCommand.ID);
    this.registerReplay(SetMapCenterCommand.ID);
    this.registerSubject(AddLayerCommand.ID);
    this.registerSubject(RemoveLayerCommand.ID);
    this.registerSubject(AddTileCommand.ID);
    this.registerSubject(RemoveTileCommand.ID);
    this.registerSubject(MapClickEvent.ID);
    this.registerSubject(CloseTooltipCommand.ID);
    this.registerSubject(FitToFeaturesCommand.ID);
    this.registerSubject(FitToPolygonsCommand.ID);
    this.registerSubject(MapMoveEndEvent.ID);
    this.registerSubject(CancelDrawingCommand.ID);
    this.registerSubject(StartDrawingCommand.ID);
    this.registerSubject(GetLayerQuery.ID);
    this.registerSubject(DrawingFinishedEvent.ID);
    this.registerSubject(GetFeaturesInAreaQuery.ID);
    this.registerSubject(DrawSelectionAreaCommand.ID);
    this.registerSubject(CancelFeatureModificationCommand.ID);
    this.registerSubject(ModifyFeatureCommand.ID);
    this.setExecutors();
  }

  private setExecutors() {
    this.registerExecutor(FilterFeaturesInAreaExecutor.ID, (e: FilterFeaturesInAreaExecutor) =>
      FeatureService.filterFeaturesInArea(e),
    );
    this.registerExecutor(CalculateAreaExecutor.ID, (e: CalculateAreaExecutor) =>
      FeatureService.calculateArea(e.polygon?.feature?.getGeometry()),
    );
    this.registerExecutor(GenerateDrawExecutor.ID, (e: GenerateDrawExecutor) => DrawingGenerationService.getDraw(e));
    this.registerExecutor(GenerateZoomControlExecutor.ID, (e: GenerateZoomControlExecutor) =>
      ZoomControlFactory.build(e.settings),
    );
    this.registerExecutor(GetMapPositionExecutor.ID, () =>this.state.getMapPosition());
  }
}
