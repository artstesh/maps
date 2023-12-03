import { FeatureLayerFactory } from './feature-layer.factory';
import { FeatureLayerSettings } from './feature-layer.settings';
import { Forger } from '@artstesh/forger';
import { Vector as Layer } from 'ol/layer';
import { should } from '@artstesh/it-should';
import Style from 'ol/style/Style';

describe('FeatureLayerFactory', () => {
  let service: FeatureLayerFactory;
  let settings: FeatureLayerSettings;
  let layer: Layer<any>;

  beforeEach(() => {
    settings = FeatureLayerSettings.copy(Forger.create<FeatureLayerSettings>()!);
    settings.style = () => new Style();
    service = new FeatureLayerFactory();
    layer = service.build(settings);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('maxZoom is correct', () => {
    //
    should().number(layer.getMaxZoom()).equals(settings.maxZoom);
  });

  it('minZoom is correct', () => {
    //
    should().number(layer.getMinZoom()).equals(settings.minZoom);
  });

  it('zIndex is correct', () => {
    //
    should().number(layer.getZIndex()).equals(settings.zIndex);
  });

  it('name is correct', () => {
    //
    should().true(layer.get('name') === settings.name);
  });

  it('style is correct', () => {
    //
    should().true(layer.getStyle() === settings.style);
  });
});
