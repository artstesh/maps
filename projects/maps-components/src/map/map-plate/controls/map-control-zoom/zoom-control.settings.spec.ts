import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { ZoomControlSettings } from "./zoom-control.settings";

describe('#map-models ZoomControlSettings', () => {
  let model: ZoomControlSettings;

  beforeEach(() => {
    model = ZoomControlSettings.copy(Forger.create<ZoomControlSettings>()!);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('setControlClass', () => {
    const expected = Forger.create<string>()!;
    //
    model = model.setControlClass(expected);
    //
    should().string(model.controlClass).equals(expected);
  });

  it('setZoomInLabel', () => {
    const expected = Forger.create<string>()!;
    //
    model = model.setZoomInLabel(expected);
    //
    should().string(model.zoomInLabel).equals(expected);
  });

  it('setZoomOutLabel', () => {
    const expected = Forger.create<string>()!;
    //
    model = model.setZoomOutLabel(expected);
    //
    should().string(model.zoomOutLabel).equals(expected);
  });

  it('setZoomInClass', () => {
    const expected = Forger.create<string>()!;
    //
    model = model.setZoomInClass(expected);
    //
    should().string(model.zoomInClass).equals(expected);
  });

  it('setZoomOutClass', () => {
    const expected = Forger.create<string>()!;
    //
    model = model.setZoomOutClass(expected);
    //
    should().string(model.zoomOutClass).equals(expected);
  });

  it('copy()', () => {
    const other = ZoomControlSettings.copy(model);
    //
    should()
      .objects(model, other)
      .equal();
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = ZoomControlSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different controlClass', () => {
      const other = ZoomControlSettings.copy(model);
      other.controlClass = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zoomOutClass', () => {
      const other = ZoomControlSettings.copy(model);
      other.zoomOutClass = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zoomInClass', () => {
      const other = ZoomControlSettings.copy(model);
      other.zoomInClass = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zoomInLabel', () => {
      const other = ZoomControlSettings.copy(model);
      other.zoomInLabel = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different zoomOutLabel', () => {
      const other = ZoomControlSettings.copy(model);
      other.zoomOutLabel = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
