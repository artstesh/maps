import { TestBed } from '@angular/core/testing';

import { MapFeatureService } from './map-feature.service';

describe('MapFeatureService', () => {
  let service: MapFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
