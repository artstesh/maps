import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { FeatureLayerSettings } from './feature-layer.settings';
import Style from 'ol/style/Style';

describe('#map-models FeatureLayerSettings', () => {
  let model: FeatureLayerSettings;

  beforeEach(() => {
    model = FeatureLayerSettings.copy(Forger.create<FeatureLayerSettings>()!);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('name is defined by default', () => {
    should().string(new FeatureLayerSettings().name).not.empty();
  });

  describe('setMaxZoom()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setMaxZoom(expected);
      //
      should().true(model.maxZoom === expected);
    });
  });

  describe('setMinZoom()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setMinZoom(expected);
      //
      should().true(model.minZoom === expected);
    });
  });

  describe('setName()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setName(expected);
      //
      should().true(model.name === expected);
    });
  });

  describe('setZIndex()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setZIndex(expected);
      //
      should().true(model.zIndex === expected);
    });
  });

  describe('setStyle()', () => {
    it('success', () => {
      const expected = Forger.create<Style>()!;
      //
      model = model.setStyle(expected);
      //
      should().true(model.style === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = FeatureLayerSettings.copy(model);
      //
      should()
        .objects(model, other)
        .rule('style', (o1, o2) => o1 === o2)
        .equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = FeatureLayerSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = FeatureLayerSettings.copy(model);
      other.maxZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = FeatureLayerSettings.copy(model);
      other.minZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zIndex', () => {
      const other = FeatureLayerSettings.copy(model);
      other.zIndex = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different name', () => {
      const other = FeatureLayerSettings.copy(model);
      other.name = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
