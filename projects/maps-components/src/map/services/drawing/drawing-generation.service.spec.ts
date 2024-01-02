import { DrawingGenerationService } from './drawing-generation.service';
import { instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../map-postboy.service';
import { Subject } from 'rxjs';
import { GenerateDrawQuery } from '../../messages/queries/generate-draw.query';

describe('DrawingGenerationService', () => {
  const postboy = mock(MapPostboyService);
  let generateQuery$: Subject<GenerateDrawQuery>;
  let service: DrawingGenerationService;

  beforeEach(() => {
    generateQuery$ = new Subject<GenerateDrawQuery>();
    when(postboy.subscribe(GenerateDrawQuery.ID)).thenReturn(generateQuery$.asObservable());
    service = new DrawingGenerationService(instance(postboy));
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
