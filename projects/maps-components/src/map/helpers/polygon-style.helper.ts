import Style from 'ol/style/Style';
import { Circle, Fill, Stroke } from "ol/style";

export class PolygonStyleHelper {
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
  public static edit(fill: string, stroke: string, strokeWidth: number = 1, pinRadius = 5): Style {
    return new Style({
      image: new Circle({
        fill: new Fill({
          color: stroke
        }),
        radius: pinRadius
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
