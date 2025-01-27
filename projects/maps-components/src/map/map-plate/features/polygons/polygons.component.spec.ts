import { ComponentFixture } from '@angular/core/testing';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import { instance, mock, when } from 'ts-mockito';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { PolygonsComponent } from './polygons.component';

describe('PolygonsComponent', () => {
  let fixture: ComponentFixture<PolygonsComponent>;
  const postboy = mock(MapPostboyService);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    return MockBuilder(PolygonsComponent, MapModule).provide(MockProvider(MapPostboyService, instance(postboy)));
  });

  beforeEach(() => {
    fixture = MockRender(PolygonsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
