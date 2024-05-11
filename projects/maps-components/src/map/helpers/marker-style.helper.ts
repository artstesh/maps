import Style from "ol/style/Style";
import { Circle, Fill, Icon, Stroke, Text } from "ol/style";

/**
 * Helper class to create and modify marker styles.
 */
export class MarkerStyleHelper {
  /**
   * Creates a new Style object from an SVG.
   * @param {string} svg - The SVG string.
   * @param {Array<number>} [size=[30, 30]] - The size of the icon image.
   * @param {number} [zIndex=400] - The zIndex of the style.
   * @returns {Style} A new Style object.
   */
  public static fromSvg(svg: string, size: [number, number] = [30, 30], zIndex = 400): Style {
    let image = new Image();
    image.src = 'data:image/svg+xml,' + escape(svg);
    return new Style({
      image: new Icon({
        img: image,
        imgSize: size,
      }),
      zIndex,
    });
  }

  /**
   * Returns a Style object with a circle style.
   *
   * @param {number} radius - The radius of the circle.
   * @param {string} fill - The fill color of the circle. Format: '#RRGGBB' or 'rgba(R, G, B, A)'.
   * @param {string} strokeColor - The stroke color of the circle. Format: '#RRGGBB' or 'rgba(R, G, B, A)'.
   * @param {number} [strokeWidth=1] - The width of the stroke. Default is 1.
   * @returns {Style} - A Style object with a Circle image.
   */
  public static circle(radius: number, fill: string, strokeColor: string, strokeWidth = 1): Style {
    return new Style({
      image: new Circle({
        radius,
        fill: new Fill({ color: fill }),
        stroke: new Stroke({ color: strokeColor, width: strokeWidth }),
      }),
    });
  }

  /**
   * Applies the given Text to the provided Style.
   *
   * @param {Style} style - The Style to modify.
   * @param {Text} text - The Text to apply to the Style.
   * @return {Style} - The modified Style with the applied Text.
   */
  public static withText(style: Style, text: Text): Style {
    style.setText(text);
    return style;
  }
}
