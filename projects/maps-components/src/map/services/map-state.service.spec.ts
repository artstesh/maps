import { TestBed } from '@angular/core/testing';

import { MapStateService } from './map-state.service';

describe('MapInteractionServiceService', () => {
  let service: MapStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
