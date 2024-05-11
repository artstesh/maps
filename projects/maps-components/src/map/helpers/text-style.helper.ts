import { Fill, Text } from 'ol/style';

/**
 * Helper class for creating text styles.
 */
export class TextStyleHelper {
  /**
   * Creates a new instance of the Text class with the specified properties.
   *
   * @param {string} text - The text content of the Text object.
   * @param {string} font - The font style of the Text object.
   * @param {string} color - The color of the Text object.
   * @return {Text} A new instance of the Text class.
   */
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
