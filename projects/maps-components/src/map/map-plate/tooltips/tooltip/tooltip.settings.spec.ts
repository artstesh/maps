import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { TooltipSettings } from './tooltip.settings';
import { MapClickEvent } from '../../../messages';

describe('#map-models TooltipSettings', () => {
  let model: TooltipSettings;

  beforeEach(() => {
    model = TooltipSettings.copy(Forger.create<TooltipSettings>()!);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('show() always true by default', () => {
    const ev = Forger.create<MapClickEvent>()!;
    //
    should().true(new TooltipSettings().show(ev));
  });

  it('ids are different', () => {
    const other = new TooltipSettings();
    //
    should().string(model.id).not.equals(other.id);
  });

  describe('setShow()', () => {
    it('success', () => {
      const ev = Forger.create<MapClickEvent>()!;
      const expected = Forger.create<boolean>()!;
      //
      model = model.setShow((ev) => expected);
      //
      should().true(model.show(ev) === expected);
    });
  });

  describe('setClass()', () => {
    it('success', () => {
      const expected = Forger.create<string>()!;
      //
      model = model.setClass(expected);
      //
      should().true(model.containerClass === expected);
    });
  });

  describe('copy()', () => {
    it('success', () => {
      const other = TooltipSettings.copy(model);
      //
      should()
        .objects(model, other)
        .rule('show', (o1, o2) => o1 === o2)
        .equal();
    });
  });

  describe('isSame()', () => {
    it('are same', () => {
      const other = TooltipSettings.copy(model);
      //
      should().true(model.isSame(other));
    });

    it('different show', () => {
      const other = TooltipSettings.copy(model);
      other.show = (ev) => Forger.create<boolean>()!;
      //
      should().false(model.isSame(other));
    });

    it('different containerClass', () => {
      const other = TooltipSettings.copy(model);
      other.containerClass = Forger.create<string>()!;
      //
      should().false(model.isSame(other));
    });

    it('different id', () => {
      const other = new TooltipSettings();
      other.show = (ev) => Forger.create<boolean>()!;
      //
      should().false(model.isSame(other));
    });
  });
});
