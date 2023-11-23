import { TestBed } from '@angular/core/testing';

import { MapPostboyService } from './map-postboy.service';

describe('MapPostboyService', () => {
  let service: MapPostboyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPostboyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
