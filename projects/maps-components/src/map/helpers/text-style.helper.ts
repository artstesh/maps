import { Fill, Text } from 'ol/style';

/**
 * Helper class for creating text styles.
 */
export class TextStyleHelper {
  /**
   * Creates and returns a new Text instance with specified styling properties.
   *
   * @param {string} text - The text content to display.
   * @param {string} font - The font style to use for the text.
   * @param {string} color - The color of the text.
   * @param {string|null|undefined} [backColor] - The background color of the text. Optional.
   * @param {number[]|null|undefined} [padding] - The padding around the text in pixels. Optional.
   * @param {string|null|undefined} [textBaseline] - The text baseline alignment. Optional.
   * @param {number|null|undefined} [offsetY] - The vertical offset for the text. Optional.
   * @return {Text} A new Text instance configured with the specified properties.
   */
  public static get(
    text: string,
    font: string,
    color: string,
    backColor?: string | null,
    padding?: number[] | null,
    textBaseline?: CanvasTextBaseline | null,
    offsetY?: number | null,
  ): Text {
    return new Text({
      text: text,
      font: font,
      textAlign: 'center',
      fill: new Fill({
        color: color,
      }),
      backgroundFill: backColor ? new Fill({ color: backColor }) : undefined,
      padding: padding ?? undefined,
      textBaseline: textBaseline ?? undefined,
      offsetY: offsetY ?? undefined,
    });
  }
}
