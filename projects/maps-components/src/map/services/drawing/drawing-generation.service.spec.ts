import { DrawingGenerationService } from './drawing-generation.service';

describe('DrawingGenerationService', () => {
  let service: DrawingGenerationService;

  beforeEach(() => {
    service = new DrawingGenerationService();
  });

  afterEach(() => {
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
