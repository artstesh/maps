import { ComponentFixture } from '@angular/core/testing';

import { MarkersComponent } from './markers.component';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import { instance, mock, when } from 'ts-mockito';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';

describe('MarkersComponent', () => {
  let fixture: ComponentFixture<MarkersComponent>;
  const postboy = mock(MapPostboyService);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    return MockBuilder(MarkersComponent, MapModule).provide(MockProvider(MapPostboyService, instance(postboy)));
  });

  beforeEach(() => {
    fixture = MockRender(MarkersComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
