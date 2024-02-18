import { Circle, Geometry, Point } from 'ol/geom';
import Polygon from 'ol/geom/Polygon';
import { Feature } from 'ol';
import * as Sphere from 'ol/sphere';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';
import { PolygonModel } from "../models";

export class FeatureService {
  constructor() {}

  public static filterFeaturesInArea(query: FilterFeaturesInAreaExecutor): Feature<Geometry>[] {
    return query.features.filter((f) => FeatureService.booleanIntersects(query.area, f.getGeometry()!));
  }

  private static booleanIntersects(g1: Geometry, g2: Geometry): boolean {
    if (g2.getType() === 'Point') return g1.intersectsCoordinate((g2 as Point).getCoordinates());
    if (g2.getType() === 'Circle') return g1.intersectsCoordinate((g2 as Circle).getCenter());
    if (g2.getType() === 'Polygon') return g1.intersectsCoordinate((g2 as Polygon).getInteriorPoint().getCoordinates());
    return false;
  }

  public static calculateArea(g: Geometry | undefined): number {
    if (!g) return 0;
    return Sphere.getArea(g, { projection: 'EPSG:4326' });
  }
}
