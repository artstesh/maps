import { TestBed } from '@angular/core/testing';

import { ClusterLayerFactory } from './cluster-layer-factory.service';

describe('ClusterLayerFactoryService', () => {
  let service: ClusterLayerFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterLayerFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
