import { Text } from 'ol/style';
import { Forger } from '@artstesh/forger';
import { TextStyleHelper } from './text-style.helper';
import { should } from '@artstesh/it-should';

describe('TextStyleHelper', () => {
  let text: Text;
  let font: string;
  let label: string;
  let color: string;
  let backColor: string;
  let padding: number[];

  beforeEach(() => {
    font = Forger.create<string>()!;
    label = Forger.create<string>()!;
    color = Forger.create<string>()!;
    backColor = Forger.create<string>()!;
    padding = Forger.create<number[]>()!;
    text = TextStyleHelper.get(label, font, color, backColor, padding);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('label is correct', () => {
    should()
      .string(text.getText() as string)
      .equals(label);
  });

  it('font is correct', () => {
    should().string(text.getFont()).equals(font);
  });

  it('padding is correct', () => {
    should().array(text.getPadding()).equal(padding);
  });

  it('color is correct', () => {
    should()
      .string(text.getFill()?.getColor() as string)
      .equals(color);
  });

  it('backColor is correct', () => {
    should()
      .string(text.getBackgroundFill()?.getColor() as string)
      .equals(backColor);
  });
});
