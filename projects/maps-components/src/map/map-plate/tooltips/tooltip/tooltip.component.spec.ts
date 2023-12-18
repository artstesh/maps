import { ComponentFixture } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';
import { instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { Subject } from 'rxjs';
import { MapClickEvent, MapRenderedEvent } from '../../../messages';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import Map from 'ol/Map';
import { CloseTooltipCommand } from '../../../messages/commands/close-tooltip.command';
import { TooltipSettings } from "./tooltip.settings";

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipComponent>;
  const postboy = mock(MapPostboyService);
  let mapRendered$: Subject<MapRenderedEvent>;
  let closeTip$: Subject<CloseTooltipCommand>;
  let mapClick$: Subject<MapClickEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    closeTip$ = new Subject<CloseTooltipCommand>();
    mapClick$ = new Subject<MapClickEvent>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(postboy.subscribe(CloseTooltipCommand.ID)).thenReturn(closeTip$.asObservable());
    when(postboy.subscribe(MapClickEvent.ID)).thenReturn(mapClick$.asObservable());
    return MockBuilder(TooltipComponent, MapModule).provide(MockProvider(MapPostboyService, instance(postboy)));
  });

  beforeEach(() => {
    fixture = MockRender(TooltipComponent);
    fixture.componentInstance.settings = new TooltipSettings();
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
