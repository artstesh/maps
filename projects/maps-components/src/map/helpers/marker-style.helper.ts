import Style from "ol/style/Style";
import { Circle, Fill, Icon, Stroke } from "ol/style";

export class MarkerStyleHelper {

  public static fromSvg(svg: string, size: [number,number] = [30, 30], zIndex = 400): Style {
    let image = new Image();
    image.src = "data:image/svg+xml," + escape(svg);
    return new Style({
      image: new Icon({
        img: image,
        imgSize: size
      }),
      zIndex
    });
  }

  public static circle(radius: number, fill: string, strokeColor: string, strokeWidth = 1): Style {
    return new Style({
      image: new Circle({
        radius,
        fill: new Fill({ color: fill }),
        stroke: new Stroke({ color: strokeColor, width: strokeWidth })
      })
    });
  }
}
