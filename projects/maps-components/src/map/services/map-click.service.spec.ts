import { MapClickService } from './map-click.service';
import { anything, instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from './map-postboy.service';
import Map from 'ol/Map';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../messages';

describe('MapInteractionService', () => {
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  let mapRendered$: ReplaySubject<MapRenderedEvent>;
  let service: MapClickService;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    when(postboy.sub(anything())).thenReturn(new Subject()); // hide for the initial step
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    when(map.on).thenReturn((() => {}) as any);
    mapRendered$.next(new MapRenderedEvent(instance(map)));
    service = new MapClickService(instance(postboy));
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
