import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { TileLayerSettings } from './tile-layer.settings';

describe('#map-models TileLayerSettings', () => {
  let model: TileLayerSettings;

  beforeEach(() => {
    model = TileLayerSettings.copy(Forger.create<TileLayerSettings>()!);
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

  describe('setName()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setName(expected);
      //
      should().true(model.name === expected);
    });
  });

  describe('setUrl()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setUrl(expected);
      //
      should().true(model.url === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = TileLayerSettings.copy(model);
      //
      should().objects(model, other).equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = TileLayerSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = TileLayerSettings.copy(model);
      other.maxZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = TileLayerSettings.copy(model);
      other.minZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different url', () => {
      const other = TileLayerSettings.copy(model);
      other.url = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different name', () => {
      const other = TileLayerSettings.copy(model);
      other.name = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
