import { DrawingService } from './drawing.service';
import { instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { CancelDrawingCommand, DrawSelectionAreaCommand, MapRenderedEvent, StartDrawingCommand } from '../../messages';

describe('DrawingService', () => {
  const postboy = mock(MapPostboyService);
  let startDrawing$: Subject<StartDrawingCommand>;
  let selectionDrawing$: Subject<DrawSelectionAreaCommand>;
  let cancelDrawing$: Subject<CancelDrawingCommand>;
  let mapRendered$: ReplaySubject<MapRenderedEvent>;
  let service: DrawingService;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    startDrawing$ = new Subject<StartDrawingCommand>();
    selectionDrawing$ = new Subject<DrawSelectionAreaCommand>();
    cancelDrawing$ = new Subject<CancelDrawingCommand>();
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    when(postboy.sub(StartDrawingCommand)).thenReturn(startDrawing$.asObservable());
    when(postboy.sub(DrawSelectionAreaCommand)).thenReturn(selectionDrawing$.asObservable());
    when(postboy.sub(CancelDrawingCommand)).thenReturn(cancelDrawing$.asObservable());
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
