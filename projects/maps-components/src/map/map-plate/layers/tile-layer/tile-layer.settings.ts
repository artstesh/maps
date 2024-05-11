/**
 * Class representing settings for a tile layer.
 */
export class TileLayerSettings {
  /**
   * The maximum zoom level for a map view.
   *
   * @type {number}
   * @default 19
   */
  maxZoom: number = 19;
  /**
   * The minimum zoom level allowed.
   *
   * @type {number}
   */
  minZoom: number = 0;
  /**
   * The opacity of an element.
   *
   * @type {number}
   * @default 0.6
   */
  opacity: number = 0.6;
  /**
   * Represents the tiles URL.
   * @typedef {string} url
   *
   * @example
   * 'https://example.ex/{z}/{x}/{y}.png'
   */
  url: string = '';
  /**
   * The projection of the coordinate system.
   *
   * @type {string}
   * @default 'EPSG:3857'
   */
  projection: string = 'EPSG:3857';

  /**
   * Creates a copy of the given tile layer settings.
   *
   * @param {TileLayerSettings} model - The tile layer settings to be copied.
   * @return {TileLayerSettings} - A new instance of TileLayerSettings with the same properties as the model.
   */
  public static copy(model: TileLayerSettings): TileLayerSettings {
    const result = new TileLayerSettings();
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.projection = model.projection;
    result.opacity = model.opacity;
    result.url = model.url;
    return result;
  }

  /**
   * Sets the URL of the TileLayerSettings object.
   *
   * @param {string} url - The URL to be set.
   * @return {TileLayerSettings} - The updated TileLayerSettings object.
   */
  setUrl(url: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, url });
  }

  /**
   * Sets the maximum zoom level for the tile layer.
   *
   * @param {number} maxZoom - The maximum zoom level.
   * @returns {TileLayerSettings} - The updated tile layer settings object.
   */
  setMaxZoom(maxZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the Tile Layer.
   *
   * @param {number} minZoom - The minimum zoom level to be set.
   * @return {TileLayerSettings} The modified TileLayerSettings object with the updated minimum zoom level.
   */
  setMinZoom(minZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, minZoom });
  }

  /**
   * Sets the opacity of the TileLayerSettings.
   *
   * @param {number} opacity - The opacity value to set. Must be a number between 0 and 1.
   * @return {TileLayerSettings} - A new instance of TileLayerSettings with the opacity set.
   */
  setOpacity(opacity: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, opacity });
  }

  /**
   * Sets the projection for the tile layer settings.
   *
   * @param {string} projection - The desired projection for the tile layer settings.
   * @return {TileLayerSettings} - The updated tile layer settings with the new projection.
   */
  setProjection(projection: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, projection });
  }

  /**
   * Checks if the current instance of TileLayerSettings is equal to the given model.
   * @param {TileLayerSettings} model - The model to compare against.
   * @return {boolean} - True if all properties of the current instance matches the properties of the model;
   *                    otherwise, false.
   */
  public isSame(model: TileLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.url !== model.url) return false;
    if (this.projection !== model.projection) return false;
    if (this.opacity !== model.opacity) return false;
    return true;
  }
}
