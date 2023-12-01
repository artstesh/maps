import { MapStateService } from './map-state.service';
import { instance, mock, reset } from 'ts-mockito';
import { MapPostboyService } from './map-postboy.service';

describe('MapStateService', () => {
  const postboy = mock(MapPostboyService);
  let service: MapStateService;

  beforeEach(() => {
    service = new MapStateService(instance(postboy));
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
