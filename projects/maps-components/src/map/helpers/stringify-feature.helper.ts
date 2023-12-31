import { Feature } from 'ol';
import { Circle, Geometry, LineString } from 'ol/geom';
import { FeatureOutputFormat } from '../models';
import { GeoJSON, WKT } from 'ol/format';
import Polygon from 'ol/geom/Polygon';
import { Coordinate } from 'ol/coordinate';
import { transform } from 'ol/proj';
import { METERS_PER_UNIT } from 'ol/proj/epsg4326';

export class StringifyFeatureHelper {
  public static polygon(feature: Feature<Geometry>, format: FeatureOutputFormat = FeatureOutputFormat.GeoJson): string {
    return format === FeatureOutputFormat.GeoJson
      ? new GeoJSON().writeFeature(feature)
      : new WKT().writeFeature(feature);
  }
  public static circle(feature: Feature<Geometry>, format: FeatureOutputFormat = FeatureOutputFormat.GeoJson): string {
    // const clone = feature.clone();
    // clone.setGeometry(fromCircle(feature.getGeometry()! as Circle));
    const tetemp = feature.getGeometryName();
    const circle = feature.getGeometry()! as Circle;
    // const temp = StringifyFeatureHelper.drawCircle(circle.getCenter(), circle.getRadius());
    const ttt = feature.getGeometry()!.getExtent()!;
    const eastPoint = [ttt[2], (ttt[1] + ttt[3]) / 2];
    const aaa = [
      ...transform([ttt[0], ttt[1]], 'EPSG:4326', 'EPSG:3857'),
      ...transform([ttt[2], ttt[3]], 'EPSG:4326', 'EPSG:3857'),
    ];
    const radius = (aaa[2] - aaa[0]) / 2;
    const radius2 = new LineString([circle.getCenter(), eastPoint]).getLength();

    const polygonGeom = new Polygon(StringifyFeatureHelper.drawCircle(circle.getCenter(), radius));

    // var edgeCoordinate = [circle.getCenter()[0] + radius, circle.getCenter()[1]];
    // var wgs84Sphere = new Sphere(6378137);
    return StringifyFeatureHelper.polygon(new Feature<Geometry>(polygonGeom), format);
    //  const rad = circle.getRadius();
    //  const degrees = 180 / Math.PI; // radians to degrees
    //  const radians = Math.PI / 180; // degrees to radians
    //  const rlat = rad * degrees * 1000;
    //  const rlng = rad * radians;
    //  return StringifyFeatureHelper.polygon(new Feature<Geometry>(circular(circle.getCenter(),circle.getRadius() * METERS_PER_UNIT)), format);
  }

  private static drawCircle(point: number[], radius: number): Coordinate[][] {
    const tetetemp = transform(point, 'EPSG:4326', 'EPSG:3857');
    // const tetetemp = point;
    const radians = Math.PI / 180; // degrees to radians
    const degrees = 180 / Math.PI; // radians to degrees
    const earthsradius = 6378137.0;
    const rlat = (radius / earthsradius) * degrees;
    const rlng = rlat / Math.cos(tetetemp[1] * radians);
    const extp: number[][] = [];
    for (let i = 0; i <= 32; i++) {
      const theta = Math.PI * (i / 16);
      extp.push([
        tetetemp[0] + rlng * Math.cos(theta) * METERS_PER_UNIT,
        tetetemp[1] + rlat * Math.sin(theta) * METERS_PER_UNIT,
      ]);
    }
    return [extp.map((e) => transform(e, 'EPSG:3857', 'EPSG:4326'))];
  }
}
