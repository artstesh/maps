import { Fill, Text } from 'ol/style';

export class TextStyleHelper {
  public static get(text: string, font: string, color: string): Text {
    return new Text({
      text: text,
      font: font,
      textAlign: 'center',
      fill: new Fill({
        color: color,
      }),
    });
  }
}
