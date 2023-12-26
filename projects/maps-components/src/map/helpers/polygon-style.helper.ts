import Style from 'ol/style/Style';
import { Fill, Stroke } from 'ol/style';

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
}
