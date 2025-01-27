import { ComponentFixture } from '@angular/core/testing';
import { MapControlZoomComponent } from './map-control-zoom.component';
import { anything, capture, instance, mock, reset, verify, when } from 'ts-mockito';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import Map from 'ol/Map';
import { should } from '@artstesh/it-should';
import { Zoom } from 'ol/control';

describe('MapControlZoomComponent', () => {
  let fixture: ComponentFixture<MapControlZoomComponent>;
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  let zoom = new Zoom();
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    when(postboy.exec<Zoom>(anything())).thenReturn(zoom);
    return MockBuilder(MapControlZoomComponent, MapModule).provide(MockProvider(MapPostboyService, instance(postboy)));
  });

  beforeEach(() => {
    fixture = MockRender(MapControlZoomComponent);
    mapRendered$.next(new MapRenderedEvent(instance(map)));
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(postboy);
    reset(map);
    expect().nothing();
  });

  it('should create', () => {
    //
    should().true(fixture.componentInstance);
  });

  it('adds the control', () => {
    const [fired] = capture(map.addControl).last();
    //
    verify(map.addControl(anything())).once();
    should().true(fired === zoom);
  });
});
