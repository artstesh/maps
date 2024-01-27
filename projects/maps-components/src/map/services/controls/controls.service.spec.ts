import { ControlsService } from './controls.service';
import { instance, mock, reset, verify, when } from 'ts-mockito';
import { MapPostboyService } from '../map-postboy.service';
import Map from 'ol/Map';
import { Subject } from 'rxjs';
import { AddControlCommand, MapRenderedEvent, RemoveControlCommand } from '../../messages';
import { Forger } from '@artstesh/forger';

describe('ControlsService', () => {
  const postboy = mock(MapPostboyService);
  const map = mock(Map);
  let mapRendered$: Subject<MapRenderedEvent>;
  let addControl$: Subject<AddControlCommand>;
  let removeControl$: Subject<RemoveControlCommand>;
  let service: ControlsService;

  beforeEach(() => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    addControl$ = new Subject<AddControlCommand>();
    removeControl$ = new Subject<RemoveControlCommand>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(postboy.subscribe(AddControlCommand.ID)).thenReturn(addControl$.asObservable());
    when(postboy.subscribe(RemoveControlCommand.ID)).thenReturn(removeControl$.asObservable());
    service = new ControlsService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    reset(map);
    expect().nothing();
  });

  describe('AddControlCommand', () => {
    let command: AddControlCommand;

    beforeEach(() => {
      command = new AddControlCommand(Forger.create<number>()! as any);
    });

    it('no map - no errors', () => {
      addControl$.next(command);
      //
      verify(map.addControl(command.item)).never();
    });

    it('success', () => {
      mapRendered$.next(new MapRenderedEvent(instance(map)));
      addControl$.next(command);
      //
      verify(map.addControl(command.item)).once();
    });
  });

  describe('RemoveControlCommand', () => {
    let command: RemoveControlCommand;

    beforeEach(() => {
      command = new RemoveControlCommand(Forger.create<number>()! as any);
    });

    it('no map - no errors', () => {
      removeControl$.next(command);
      //
      verify(map.removeControl(command.item)).never();
    });

    it('success', () => {
      mapRendered$.next(new MapRenderedEvent(instance(map)));
      removeControl$.next(command);
      //
      verify(map.removeControl(command.item)).once();
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
