import { Feature } from 'ol';
import { Circle, Geometry } from 'ol/geom';
import { FeatureOutputFormat } from '../models';
import { GeoJSON, WKT } from 'ol/format';
import Polygon from 'ol/geom/Polygon';
import { Coordinate } from 'ol/coordinate';
import { transform } from 'ol/proj';
import { METERS_PER_UNIT } from 'ol/proj/epsg4326';

/**
 * A helper class for converting and stringify features.
 */
export class StringifyFeatureHelper {
  public static polygon(feature: Feature<Geometry>, format: FeatureOutputFormat = FeatureOutputFormat.GeoJson): string {
    return format === FeatureOutputFormat.GeoJson
      ? new GeoJSON().writeFeature(feature)
      : new WKT().writeFeature(feature);
  }

  /**
   * Creates a polygon feature representing a circle based on a given feature with a circle geometry.
   *
   * @param {Feature<Geometry>} feature - The input feature with a circle geometry.
   * @param {FeatureOutputFormat} format - The format for outputting the polygon feature. (default: FeatureOutputFormat.GeoJson)
   *
   * @return {string} - The string representation of the polygon feature.
   */
  public static circle(feature: Feature<Geometry>, format: FeatureOutputFormat = FeatureOutputFormat.GeoJson): string {
    const circle = feature.getGeometry()! as Circle;
    const ext = feature.getGeometry()!.getExtent()!;
    const coords = [
      ...transform([ext[0], ext[1]], 'EPSG:4326', 'EPSG:3857'),
      ...transform([ext[2], ext[3]], 'EPSG:4326', 'EPSG:3857'),
    ];
    const radius = (coords[2] - coords[0]) / 2;

    const polygonGeom = new Polygon(StringifyFeatureHelper.drawCircle(circle.getCenter(), radius));
    return StringifyFeatureHelper.polygon(new Feature<Geometry>(polygonGeom), format);
  }

  /**
   * Draw a circle based on a center point and radius.
   *
   * @param {number[]} point - The center point coordinates in EPSG:4326 format.
   * @param {number} radius - The radius of the circle in meters.
   * @return {Coordinate[][]} - The coordinates of the circle boundary in EPSG:4326 format.
   */
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
