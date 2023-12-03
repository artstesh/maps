import { MapStateService } from './map-state.service';
import { instance, mock, reset, when } from "ts-mockito";
import { MapPostboyService } from './map-postboy.service';
import Map from 'ol/Map';
import { Subject, Subscription } from "rxjs";
import { MapRenderedEvent } from "../messages";

describe('MapStateService', () => {
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  let service: MapStateService;
  let mapRendered$ = new Subject<MapRenderedEvent>();

  beforeEach(() => {
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    service = new MapStateService(instance(postboy));
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
