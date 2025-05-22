/**
 * An enumeration representing different formats for feature outputs.
 * This can be used to specify the desired output format when dealing with geospatial data.
 *
 * Enumerators:
 * - GeoJson: Represents the GeoJSON format for geospatial data.
 * - WKT: Represents the Well-Known Text (WKT) format for geospatial data.
 */
export enum FeatureOutputFormat {
  GeoJson = 1,
  WKT,
  Geometry
}
