import { MapStateService } from './map-state.service';
import { anything, capture, instance, mock, reset, verify, when } from 'ts-mockito';
import { MapPostboyService } from './map-postboy.service';
import Map from 'ol/Map';
import { Subject } from 'rxjs';
import { MapRenderedEvent, SetMapCenterCommand } from '../messages';
import { Forger } from '@artstesh/forger';
import View from 'ol/View';
import { should } from '@artstesh/it-should';

describe('MapStateService', () => {
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  const view = mock(View);
  let service: MapStateService;
  let mapRendered$: Subject<MapRenderedEvent>;
  let setCenter$: Subject<SetMapCenterCommand>;

  beforeEach(() => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    setCenter$ = new Subject<SetMapCenterCommand>();
    when(map.on).thenReturn((() => {}) as any);
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    when(postboy.sub(SetMapCenterCommand)).thenReturn(setCenter$.asObservable());
    service = new MapStateService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    reset(map);
    reset(view);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('SetMapCenterCommand', () => {
    let command: SetMapCenterCommand;
    let lat: number;
    let lng: number;
    let zoom: number;

    beforeEach(() => {
      when(map.getView()).thenReturn(instance(view));
      lat = Forger.create<number>()!;
      lng = Forger.create<number>()!;
      zoom = Forger.create<number>()!;
      command = new SetMapCenterCommand(lat, lng, zoom);
    });

    it('coordinates: no map - no errors', () => {
      setCenter$.next(command);
      //
      verify(view.setCenter(anything())).never();
    });

    it('coordinates: success', () => {
      mapRendered$.next(new MapRenderedEvent(instance(map)));
      setCenter$.next(command);
      //
      const [coords] = capture(view.setCenter).last();
      verify(view.setCenter(anything())).once();
      should().array(coords).equal([lng, lat]);
    });

    it('zoom: no map - no errors', () => {
      setCenter$.next(command);
      //
      verify(view.setZoom(anything())).never();
    });

    it('zoom: success', () => {
      mapRendered$.next(new MapRenderedEvent(instance(map)));
      setCenter$.next(command);
      //
      const fZoom = capture(view.setZoom).last()[0];
      verify(view.setZoom(anything())).once();
      should().number(fZoom).equals(zoom);
    });
  });
});
