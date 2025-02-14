import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { MapSettings } from './map-settings';
import { MapLyrs } from './map-lyrs.enum';
import { DefaultsOptions } from 'ol/interaction';

describe('#map-models MapSettings', () => {
  let model: MapSettings;

  beforeEach(() => {
    model = MapSettings.copy(Forger.create<MapSettings>()!);
  });

  afterEach(() => {
    expect().nothing();
  });

  describe('setCenter()', () => {
    it('success', () => {
      const expected = Forger.create<DefaultsOptions>()!;
      //
      model = model.setInteractionSettings(expected);
      //
      should().true(model.interactionSettings === expected);
    });
  });

  describe('setCenter()', () => {
    it('success', () => {
      const expected = Forger.create<number[]>()!;
      //
      model = model.setCenter(expected);
      //
      should().true(model.center === expected);
    });
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

  describe('setZoom()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setZoom(expected);
      //
      should().true(model.zoom === expected);
    });
  });

  describe('setLyrs()', () => {
    it('success', () => {
      const expected = Forger.create<MapLyrs>()!;
      //
      model = model.setLyrs(expected);
      //
      should().true(model.lyrs === expected);
    });
  });

  describe('setLanguage()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setLanguage(expected);
      //
      should().true(model.language === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      //
      should().objects(model, MapSettings.copy(model)).equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = MapSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = MapSettings.copy(model);
      other.maxZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different interactionSettings', () => {
      const other = MapSettings.copy(model);
      other.interactionSettings = Forger.create<DefaultsOptions>()!;
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = MapSettings.copy(model);
      other.minZoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zoom', () => {
      const other = MapSettings.copy(model);
      other.zoom = Forger.create<number>()!;
      //
      should().false(model.isSame(other));
    });

    it('different language', () => {
      const other = MapSettings.copy(model);
      other.language = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different language', () => {
      const other = MapSettings.copy(model);
      model.lyrs = MapLyrs.Hybrid;
      other.lyrs = MapLyrs.Satellite;
      //
      should().false(model.isSame(other));
    });

    it('different center', () => {
      const other = MapSettings.copy(model);
      model.center = Forger.create<number[]>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
