import { DrawingService } from './drawing.service';
import { instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { CancelDrawingCommand, MapRenderedEvent, StartDrawingCommand } from '../../messages';

describe('DrawingService', () => {
  const postboy = mock(MapPostboyService);
  let startDrawing$: Subject<StartDrawingCommand>;
  let cancelDrawing$: Subject<CancelDrawingCommand>;
  let mapRendered$: ReplaySubject<MapRenderedEvent>;
  let service: DrawingService;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    startDrawing$ = new Subject<StartDrawingCommand>();
    cancelDrawing$ = new Subject<CancelDrawingCommand>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(postboy.subscribe(StartDrawingCommand.ID)).thenReturn(startDrawing$.asObservable());
    when(postboy.subscribe(CancelDrawingCommand.ID)).thenReturn(cancelDrawing$.asObservable());
    service = new DrawingService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
