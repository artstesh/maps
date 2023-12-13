// noinspection JSVoidFunctionReturnValueUsed

import { MapManagementService } from './map-management.service';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { MapPostboyService } from './map-postboy.service';
import Map from 'ol/Map';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../messages';
import { Vector as Source } from 'ol/source';
import { Vector as Layer } from 'ol/layer';
import { Forger } from '@artstesh/forger';
import { AddLayerCommand } from '../messages/commands/add-layer.command';

describe('MapManagementService', () => {
  const postboy = mock(MapPostboyService);
  let service: MapManagementService;
  const map = mock(Map);
  let mapRendered$: ReplaySubject<MapRenderedEvent>;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    when(postboy.subscribe(anything())).thenReturn(new Subject()); // hide for the initial step
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    mapRendered$.next(new MapRenderedEvent(instance(map)));
    service = new MapManagementService(instance(postboy));
  });

  afterEach(() => {
    reset(postboy);
    reset(map);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('LayerCommands', () => {
    const layer = mock(Layer);
    const source = mock(Source);
    let layerName: string;
    let addLayerEvent$: Subject<AddLayerCommand>;

    beforeEach(() => {
      layerName = Forger.create<string>()!;
      addLayerEvent$ = new Subject<AddLayerCommand>();
      when(layer.get('name')).thenReturn(layerName);
      when(postboy.subscribe<AddLayerCommand>(AddLayerCommand.ID)).thenReturn(addLayerEvent$.asObservable());
      when(layer.getSource()).thenReturn(instance(source));
      service = new MapManagementService(instance(postboy));
    });

    afterEach(() => {
      reset(postboy);
      reset(map);
    });

    it('add without map ok', () => {
      mapRendered$.next(new MapRenderedEvent(undefined as any));
      //
      addLayerEvent$.next(new AddLayerCommand(instance(layer)));
      //
      verify(map.addLayer(anything())).never();
    });

    it('add layer success', () => {
      const ev = new AddLayerCommand(instance(layer));
      //
      addLayerEvent$.next(ev);
      //
      verify(map.addLayer(anything())).once();
    });
  });
});
