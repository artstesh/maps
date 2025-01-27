import Map from 'ol/Map';
import { MapFeatureService } from './map-feature.service';
import { anything, instance, mock, reset, when } from 'ts-mockito';
import { MapRenderedEvent } from '../messages';
import { MapPostboyService } from './map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';

describe('MapFeatureService', () => {
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  let mapRendered$: ReplaySubject<MapRenderedEvent>;
  let service: MapFeatureService;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    when(postboy.sub(anything())).thenReturn(new Subject()); // hide for the initial step
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    mapRendered$.next(new MapRenderedEvent(instance(map)));
    service = new MapFeatureService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    reset(map);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
