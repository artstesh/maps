import { Draw } from "ol/interaction";
import { DrawingType } from "../../models";
import { createRegularPolygon, GeometryFunction } from "ol/interaction/Draw";
import { GenerateDrawExecutor } from "../../messages/executors/generate-draw.executor";

export class DrawingGenerationService {
  public static getDraw(ev: GenerateDrawExecutor) {
    return new Draw({
      source: ev.layer.getSource()!,
      type: ev.type === DrawingType.Polygon ? 'Polygon' : 'Circle',
      style: ev.style,
      geometryFunction: DrawingGenerationService.geometryFunc(ev.type),
    });
  }

  private static geometryFunc(type: DrawingType): GeometryFunction | undefined {
    switch (type) {
      case DrawingType.Circle:
        return createRegularPolygon(32);
      case DrawingType.Square:
        return createRegularPolygon(4);
    }
    return undefined;
  }
}
