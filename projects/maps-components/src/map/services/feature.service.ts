import { Circle, Geometry, GeometryCollection, LineString, Point } from 'ol/geom';
import Polygon, { fromCircle } from 'ol/geom/Polygon';
import { Feature } from 'ol';
import * as Sphere from 'ol/sphere';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';
import { FilterFeaturesInPointExecutor } from '../messages';

export class FeatureService {
  constructor() {}

  public static filterFeaturesInArea(query: FilterFeaturesInAreaExecutor): Feature<Geometry>[] {
    return query.features.filter((f) => FeatureService.booleanIntersects(query.area, f.getGeometry()!));
  }

  public static filterFeaturesInPoint(query: FilterFeaturesInPointExecutor): Feature<Geometry>[] {
    return query.features.filter((f) =>
      FeatureService.booleanIntersects(f.getGeometry()!, new Point([query.lng, query.lat])),
    );
  }

  public static calculateArea(g: Geometry | undefined): number {
    if (!g) return 0;
    return Sphere.getArea(g, { projection: 'EPSG:4326' });
  }

  public static polygonSelfIntersects(feature: Feature<Geometry>): boolean {
    if (feature.getGeometry()!.getType() !== 'Polygon') return false;
    let intersections = 0;
    const segments = FeatureService.getSegmentsFromCoordinates(feature.getGeometry()!);
    for (let i = 0; i < segments.length; i++) {
      for (let z = i + 1; z < segments.length; z++) {
        if (
          !intersections &&
          this.segmentIntersection(segments[i].getCoordinates(), segments[z].getCoordinates())
        ) {
          intersections++;
        }
      }
    }
    return intersections !== 0;
  }

  private static booleanIntersects(g1: Geometry, g2: Geometry): boolean {
    if (g2.getType() === 'Point') return g1.intersectsCoordinate((g2 as Point).getCoordinates());
    if (g2.getType() === 'Circle') return g1.intersectsCoordinate((g2 as Circle).getCenter());
    if (g2.getType() === 'Polygon') return g1.intersectsCoordinate((g2 as Polygon).getInteriorPoint().getCoordinates());
    return false;
  }

  private static getSegmentsFromCoordinates(geom: Geometry): LineString[] {
    if (!geom) return [];
    const coords = (geom as any).getCoordinates();
    const line = new LineString(coords[0]);
    const segments: LineString[] = [];
    line.forEachSegment((s1, s2) => {
      const l = new LineString([s1, s2]);
      l.scale(0.999); // bug of the OL, as I see
      segments.push(l);
    });
    return segments;
  }

  private static segmentIntersection(s1: number[][], s2: number[][]): boolean {
    const a = s1[0],
      b = s1[1],
      c = s2[0],
      d = s2[1];
    const o1 = this.orientation(a, b, c);
    const o2 = this.orientation(a, b, d);
    const o3 = this.orientation(c, d, a);
    const o4 = this.orientation(c, d, b);
    return (
      (o1 != o2 && o3 != o4) ||
      (o1 == 0 && this.onSegment(a, d, b)) ||
      (o2 == 0 && this.onSegment(a, d, b)) ||
      (o3 == 0 && this.onSegment(d, a, d)) ||
      (o4 == 0 && this.onSegment(d, b, d))
    );
  }

  private static orientation(p: number[], q: number[], r: number[]): number {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val == 0) return 0; // collinear
    return val > 0 ? 1 : 2; // clock or counterclock wise
  }

  private static onSegment(p: number[], q: number[], r: number[]): boolean {
    return (
      q[0] <= (p[0] > r[0] ? p[0] : r[0]) &&
      q[0] >= (p[0] < r[0] ? p[0] : r[0]) &&
      q[1] <= (p[1] > r[1] ? p[1] : r[1]) &&
      q[1] >= (p[1] < r[1] ? p[1] : r[1])
    );
  }
}
