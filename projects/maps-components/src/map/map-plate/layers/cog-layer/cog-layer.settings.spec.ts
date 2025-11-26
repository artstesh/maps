import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { CogLayerSettings } from './cog-layer.settings';

describe('#map-models CogLayerSettings', () => {
  let model: CogLayerSettings;

  beforeEach(() => {
    model = new CogLayerSettings();
  });

  afterEach(() => {
    expect().nothing();
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

  describe('setProjection()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setProjection(expected);
      //
      should().true(model.projection === expected);
    });
  });

  describe('setUrl()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setUrl(expected);
      //
      should().string(model.url).equals(expected);
    });
  });

  describe('setRequestHeaders()', () => {
    it('success', () => {
      const expected = Forger.create<Record<string, string>>()!;
      //
      model = model.setRequestHeaders(expected);
      //
      should().objects(model.requestHeaders!, expected).equal();
    });
  });

  describe('setOpacity()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setOpacity(expected);
      //
      should().number(model.opacity).equals(expected);
    });
  });

  describe('setStyle()', () => {
    it('success', () => {
      const expected = {};
      //
      model = model.setStyle(expected);
      //
      should().true(model.style === expected);
    });
  });

  describe('setExtent()', () => {
    it('success', () => {
      const expected = Forger.create<number[]>()!;
      //
      model = model.setExtent(expected);
      //
      should().true(model.extent === expected);
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

  describe('setCacheSize()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setCacheSize(expected);
      //
      should().true(model.cacheSize === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = CogLayerSettings.copy(model);
      //
      should().objects(model, other).equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = CogLayerSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = CogLayerSettings.copy(model);
      other.maxZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = CogLayerSettings.copy(model);
      other.minZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different url', () => {
      const other = CogLayerSettings.copy(model);
      other.url = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different requestHeaders', () => {
      const other = CogLayerSettings.copy(model);
      other.requestHeaders = {};
      //
      should().false(model.isSame(other));
    });

    it('different url', () => {
      const other = CogLayerSettings.copy(model);
      other.projection = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different opacity', () => {
      const other = CogLayerSettings.copy(model);
      other.opacity = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different operation', () => {
      const other = CogLayerSettings.copy(model);
      other.style = {};
      //
      should().false(model.isSame(other));
    });

    it('different extent', () => {
      const other = CogLayerSettings.copy(model);
      other.extent = Forger.create<number[]>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zIndex', () => {
      const other = CogLayerSettings.copy(model);
      other.zIndex = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different cacheSize', () => {
      const other = CogLayerSettings.copy(model);
      other.cacheSize = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
