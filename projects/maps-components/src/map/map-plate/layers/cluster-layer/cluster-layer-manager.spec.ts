import { TestBed } from '@angular/core/testing';

import { ClusterLayerManager } from './cluster-layer.manager';

describe('ClusterLayerManagerService', () => {
  let service: ClusterLayerManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClusterLayerManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
