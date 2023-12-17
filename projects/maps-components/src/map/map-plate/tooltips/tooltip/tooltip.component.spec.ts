import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import { anything, instance, mock, reset, when } from "ts-mockito";
import { MapPostboyService } from "../../../services/map-postboy.service";
import { Subject } from "rxjs";
import { MapRenderedEvent } from "../../../messages";
import { MockBuilder, MockProvider, MockRender } from "ng-mocks";
import { MapModule } from "../../../map.module";
import { FeatureLayerFactory } from "../../layers/feature-layer/feature-layer.factory";
import Map from "ol/Map";

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipComponent>;
  const postboy = mock(MapPostboyService);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    return MockBuilder(TooltipComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)));
  });

  beforeEach(() => {
    fixture = MockRender(TooltipComponent);
    mapRendered$.next(new MapRenderedEvent(instance(mock(Map))));
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
