import Style from "ol/style/Style";
import { Circle, Fill, Stroke } from "ol/style";

/**
 * A helper class for creating polygon styles.
 * @class
 */
export class PolygonStyleHelper {
  /**
   * Creates a Style object with the given fill color, stroke color, and stroke width.
   *
   * @param {string} fill - The fill color in hexadecimal or RGB format.
   * @param {string} stroke - The stroke color in hexadecimal or RGB format.
   * @param {number} [strokeWidth=1] - The width of the stroke. Defaults to 1.
   * @return {Style} The created Style object.
   */
  public static simple(fill: string, stroke: string, strokeWidth: number = 1): Style {
    return new Style({
      fill: new Fill({
        color: fill,
      }),
      stroke: new Stroke({
        color: stroke,
        width: strokeWidth,
      }),
    });
  }

  /**
   * Creates a new Style object with the given fill, stroke, stroke width, and pin radius.
   *
   * @param {string} fill - The color to use for the fill of the style.
   * @param {string} stroke - The color to use for the stroke of the style.
   * @param {number} [strokeWidth=1] - The width of the stroke. Defaults to 1.
   * @param {number} [pinRadius=5] - The radius of the circle used as the image for the style. Defaults to 5.
   * @returns {Style} - The newly created Style object.
   */
  public static edit(fill: string, stroke: string, strokeWidth: number = 1, pinRadius = 5): Style {
    return new Style({
      image: new Circle({
        fill: new Fill({
          color: stroke,
        }),
        radius: pinRadius,
      }),
      fill: new Fill({
        color: fill,
      }),
      stroke: new Stroke({
        color: stroke,
        width: strokeWidth,
      }),
    });
  }
}
