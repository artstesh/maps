import { MapManagementService } from './map-management.service';
import { instance, mock, reset } from 'ts-mockito';
import { MapPostboyService } from './map-postboy.service';

describe('MapManagementService', () => {
  const postboy = mock(MapPostboyService);
  let service: MapManagementService;

  beforeEach(() => {
    service = new MapManagementService(instance(postboy));
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
