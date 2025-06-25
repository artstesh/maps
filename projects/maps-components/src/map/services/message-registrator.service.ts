import { Injectable } from '@angular/core';
import { MapPostboyService } from './map-postboy.service';
import {
  FitToPolygonsCommand,
  GetFeaturesInPointQuery,
  MapPointerMoveEvent,
  MapRenderedEvent,
  PolygonSelfIntersectionExecutor,
} from '../messages';
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
import { GetMapPositionExecutor } from '../messages/executors/get-map-position.executor';
import { FilterFeaturesInPointExecutor } from '../messages/executors/filter-features-in-point.executor';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MapFeatureHoveredEvent } from '../messages/events/map-feature-hovered.event';

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
    this.recordReplay(MapRenderedEvent);
    this.recordReplay(PlaceLayerFeaturesCommand);
    this.recordReplay(RemoveControlCommand);
    this.recordReplay(AddControlCommand);
    this.recordReplay(SetMapCenterCommand);
    this.recordSubject(AddLayerCommand);
    this.recordSubject(RemoveLayerCommand);
    this.recordSubject(AddTileCommand);
    this.recordSubject(RemoveTileCommand);
    this.recordSubject(MapClickEvent);
    this.recordSubject(CloseTooltipCommand);
    this.recordSubject(FitToFeaturesCommand);
    this.recordSubject(FitToPolygonsCommand);
    this.recordSubject(MapMoveEndEvent);
    this.recordSubject(CancelDrawingCommand);
    this.recordSubject(StartDrawingCommand);
    this.recordSubject(GetLayerQuery);
    this.recordSubject(MapFeatureHoveredEvent);
    this.recordWithPipe(MapPointerMoveEvent, new Subject(), (s) => s.pipe(debounceTime(150)));
    this.recordSubject(DrawingFinishedEvent);
    this.recordSubject(GetFeaturesInAreaQuery);
    this.recordSubject(DrawSelectionAreaCommand);
    this.recordSubject(CancelFeatureModificationCommand);
    this.recordSubject(ModifyFeatureCommand);
    this.recordSubject(GetFeaturesInPointQuery);
    this.setExecutors();
  }

  private setExecutors() {
    this.recordExecutor(FilterFeaturesInAreaExecutor, (e) => FeatureService.filterFeaturesInArea(e));
    this.recordExecutor(FilterFeaturesInPointExecutor, (e) => FeatureService.filterFeaturesInPoint(e));
    this.recordExecutor(CalculateAreaExecutor, (e) => FeatureService.calculateArea(e.polygon?.feature?.getGeometry()));
    this.recordExecutor(PolygonSelfIntersectionExecutor, (e) =>
      FeatureService.polygonSelfIntersects(e.polygon.feature),
    );
    this.recordExecutor(GenerateDrawExecutor, (e) => DrawingGenerationService.getDraw(e));
    this.recordExecutor(GenerateZoomControlExecutor, (e) => ZoomControlFactory.build(e.settings));
    this.recordExecutor(GetMapPositionExecutor, () => this.state.getMapPosition());
  }
}
