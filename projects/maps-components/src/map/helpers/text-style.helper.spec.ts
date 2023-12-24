import { Text } from 'ol/style';
import { Forger } from '@artstesh/forger';
import { TextStyleHelper } from './text-style.helper';
import { should } from '@artstesh/it-should';

describe('TextStyleHelper', () => {
  let text: Text;
  let font: string;
  let label: string;
  let color: string;

  beforeEach(() => {
    font = Forger.create<string>()!;
    label = Forger.create<string>()!;
    color = Forger.create<string>()!;
    text = TextStyleHelper.get(label, font, color);
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

  it('color is correct', () => {
    should()
      .string(text.getFill()?.getColor() as string)
      .equals(color);
  });
});
