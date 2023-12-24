import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import Style from 'ol/style/Style';
import { ClusterLayerSettings } from "./cluster-layer.settings";
import { IIdentified } from "../../../models/i-identified";

describe('#map-models ClusterLayerSettings', () => {
  let model: ClusterLayerSettings;

  beforeEach(() => {
    model = ClusterLayerSettings.copy(Forger.create<ClusterLayerSettings>()!);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('name is defined by default', () => {
    should().string(new ClusterLayerSettings().name).not.empty();
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

  describe('setdDistance()', () => {
    it('success', () => {
      const expected = Forger.create<number>()!;
      //
      model = model.setDistance(expected);
      //
      should().true(model.distance === expected);
    });
  });

  describe('setBbox()', () => {
    it('success', () => {
      const expected = !model.bbox;
      //
      model = model.setBbox(expected);
      //
      should().true(model.bbox === expected);
    });
  });

  describe('setStyle()', () => {
    it('success', () => {
      const expResult = Forger.create<Style>()!;
      const ids = Forger.create<IIdentified[]>()!;
      const style = (f: IIdentified[]) => expResult;
      //
      model = model.setStyle(style);
      //
      should().true(model.style!(ids) === expResult);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = ClusterLayerSettings.copy(model);
      //
      should()
        .objects(model, other)
        .rule('style', (o1, o2) => o1 === o2)
        .equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = ClusterLayerSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different maxZoom', () => {
      const other = ClusterLayerSettings.copy(model)
        .setMaxZoom(model.maxZoom + Forger.create<number>()!);
      //
      should().false(model.isSame(other));
    });

    it('different minZoom', () => {
      const other = ClusterLayerSettings.copy(model)
        .setMinZoom(model.minZoom + Forger.create<number>()!);
      //
      should().false(model.isSame(other));
    });

    it('different zIndex', () => {
      const other = ClusterLayerSettings.copy(model)
        .setZIndex(model.zIndex + Forger.create<number>()!);
      //
      should().false(model.isSame(other));
    });

    it('different name', () => {
      const other = ClusterLayerSettings.copy(model).setName(Forger.create<string>()!);
      //
      should().false(model.isSame(other));
    });

    it('different bbox', () => {
      const other = ClusterLayerSettings.copy(model).setBbox(!model.bbox);
      //
      should().false(model.isSame(other));
    });

    it('different distance', () => {
      const other = ClusterLayerSettings.copy(model)
        .setDistance(model.distance + Forger.create<number>()!);
      //
      should().false(model.isSame(other));
    });

    it('different style', () => {
      const style = (f: IIdentified[]) => Forger.create<Style>()!;
      const other = ClusterLayerSettings.copy(model).setStyle(style);
      //
      should().false(model.isSame(other));
    });
  });
});
