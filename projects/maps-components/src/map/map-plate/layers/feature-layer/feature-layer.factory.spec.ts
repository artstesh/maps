import { FeatureLayerFactory } from './feature-layer.factory';

describe('FeatureLayerFactory', () => {
  let service: FeatureLayerFactory;

  beforeEach(() => {
    service = new FeatureLayerFactory();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
