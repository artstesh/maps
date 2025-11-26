import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';

describe('#map-models RasterTileLayerSettings', () => {
  let model: RasterTileLayerSettings;

  beforeEach(() => {
    model = RasterTileLayerSettings.copy(Forger.create<RasterTileLayerSettings>()!);
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

  describe('setZIndex()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setZIndex(expected);
      //
      should().true(model.zIndex === expected);
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

  describe('setOperation()', () => {
    it('success', () => {
      const expected = (d: number[][] | ImageData[]) => d[0];
      //
      model = model.setOperation(expected);
      //
      should().true(model.operation === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = RasterTileLayerSettings.copy(model);
      //
      should().objects(model, other).equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = RasterTileLayerSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.maxZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.minZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zIndex', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.zIndex = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different url', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.url = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different requestHeaders', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.requestHeaders = {};
      //
      should().false(model.isSame(other));
    });

    it('different url', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.projection = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different opacity', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.opacity = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different operation', () => {
      const other = RasterTileLayerSettings.copy(model);
      other.operation = (d: number[][] | ImageData[]) => d[0];
      //
      should().false(model.isSame(other));
    });
  });
});
