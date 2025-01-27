/**
 * Represents a position and view configuration on a map.
 *
 * This interface is utilized to store and retrieve geographic and viewport details,
 * including location coordinates, zoom level, and map extent.
 *
 * Properties:
 * - `latitude`: The latitude coordinate of the map's center point.
 * - `longitude`: The longitude coordinate of the map's center point.
 * - `zoom`: The zoom level of the map's view.
 * - `extent`: The geographical rectangular bounds defining the visible area of the map, represented as an array of coordinates [minX, minY, maxX, maxY].
 */
export interface MapPosition {
  latitude: number;
  longitude: number;
  zoom: number;
  extent: number[];
}
