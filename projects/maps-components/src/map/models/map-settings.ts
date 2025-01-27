import { MapLyrs } from './map-lyrs.enum';

/**
 * Represents the configurable settings for a map instance, providing
 * options for center coordinates, zoom levels, map layers, and language.
 */
export class MapSettings {
  center: number[] = [0, 0];
  maxZoom: number = 19;
  minZoom: number = 0;
  zoom: number = 4;
  lyrs: MapLyrs = MapLyrs.Hybrid;
  language: string = 'en';

  public static copy(model: MapSettings): MapSettings {
    const result = new MapSettings();
    result.center = model.center;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.zoom = model.zoom;
    result.lyrs = model.lyrs;
    result.language = model.language;
    return result;
  }

  /**
   * Sets the center for the map settings.
   *
   * @param {number[]} center - A two-element array representing the latitude and longitude of the map's center.
   * @return {MapSettings} A new MapSettings object with the updated center.
   */
  setCenter(center: number[]): MapSettings {
    return MapSettings.copy({ ...this, center });
  }

  /**
   * Sets the maximum zoom level for the map.
   *
   * @param {number} maxZoom - The maximum zoom level to be set.
   * @return {MapSettings} A new instance of MapSettings with the updated maximum zoom level.
   */
  setMaxZoom(maxZoom: number): MapSettings {
    return MapSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the map settings.
   *
   * @param {number} minZoom The minimum zoom level to be set. Must be a valid numeric value.
   * @return {MapSettings} A new MapSettings object with the updated minimum zoom level.
   */
  setMinZoom(minZoom: number): MapSettings {
    return MapSettings.copy({ ...this, minZoom });
  }

  /**
   * Adjusts the zoom level of the map by setting the specified value.
   *
   * @param {number} zoom - The desired zoom level to be set.
   * @return {MapSettings} A new MapSettings instance with the updated zoom level.
   */
  setZoom(zoom: number): MapSettings {
    return MapSettings.copy({ ...this, zoom });
  }

  /**
   * Sets the layers in the map settings with the provided layers.
   *
   * @param {MapLyrs} lyrs - The layers to be set in the map settings.
   * @return {MapSettings} A new instance of MapSettings with the updated layers.
   */
  setLyrs(lyrs: MapLyrs): MapSettings {
    return MapSettings.copy({ ...this, lyrs });
  }

  /**
   * Updates the language setting for the map configuration and returns a new instance with the updated language.
   *
   * @param {string} language - The language to be set for the map configuration.
   * @return {MapSettings} A new instance of MapSettings with the updated language.
   */
  setLanguage(language: string): MapSettings {
    return MapSettings.copy({ ...this, language });
  }

  /**
   * Compares the current MapSettings instance with another to determine if they are identical.
   *
   * @param {MapSettings} model - The MapSettings instance to compare with the current instance.
   * @return {boolean} Returns true if both MapSettings instances have the same properties and values; otherwise, false.
   */
  public isSame(model: MapSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.zoom !== model.zoom) return false;
    if (this.lyrs !== model.lyrs) return false;
    if (this.language !== model.language) return false;
    return this.center.length === model.center.length && !this.center.filter((c, i) => c !== model.center[i]).length;
  }
}
