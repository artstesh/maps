export class RasterTileLayerSettings {
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
   * Additional headers that should be added to each tile request
   *
   * @type {Record<string, string>}
   * @default An empty array
   */
  requestHeaders: Record<string, string> | null = null;

  operation: (data: number[][] | ImageData[] ) => (number[] | ImageData) = d => d[0]??[];
  /**
   * Creates a copy of the given tile layer settings.
   *
   * @param {RasterTileLayerSettings} model - The tile layer settings to be copied.
   * @return {RasterTileLayerSettings} - A new instance of RasterTileLayerSettings with the same properties as the model.
   */
  public static copy(model: RasterTileLayerSettings): RasterTileLayerSettings {
    const result = new RasterTileLayerSettings();
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.projection = model.projection;
    result.opacity = model.opacity;
    result.url = model.url;
    result.requestHeaders = model.requestHeaders;
    result.operation = model.operation;
    return result;
  }

  /**
   * Sets the URL of the RasterTileLayerSettings object.
   *
   * @param {string} url - The URL to be set.
   * @return {RasterTileLayerSettings} - The updated RasterTileLayerSettings object.
   */
  setUrl(url: string): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, url });
  }

  /**
   * Sets the operation to apply on raster tile data.
   *
   * @param {function} operation - A function that takes an input of either a two-dimensional array of numbers or an array of ImageData objects and returns either a one-dimensional array of numbers or an ImageData object.
   * @return {RasterTileLayerSettings} A new instance of RasterTileLayerSettings with the updated operation.
   */
  setOperation(operation: (data: number[][] | ImageData[] ) => (number[] | ImageData)): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, operation });
  }

  /**
   * Sets the requestHeaders of the RasterTileLayerSettings object.
   *
   * @param {Record<string, string>} requestHeaders - The headers which should be provided.
   * @return {RasterTileLayerSettings} - The updated RasterTileLayerSettings object.
   */
  setRequestHeaders(requestHeaders: Record<string, string>): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, requestHeaders });
  }

  /**
   * Sets the maximum zoom level for the tile layer.
   *
   * @param {number} maxZoom - The maximum zoom level.
   * @returns {RasterTileLayerSettings} - The updated tile layer settings object.
   */
  setMaxZoom(maxZoom: number): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the Tile Layer.
   *
   * @param {number} minZoom - The minimum zoom level to be set.
   * @return {RasterTileLayerSettings} The modified RasterTileLayerSettings object with the updated minimum zoom level.
   */
  setMinZoom(minZoom: number): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, minZoom });
  }

  /**
   * Sets the opacity of the RasterTileLayerSettings.
   *
   * @param {number} opacity - The opacity value to set. Must be a number between 0 and 1.
   * @return {RasterTileLayerSettings} - A new instance of RasterTileLayerSettings with the opacity set.
   */
  setOpacity(opacity: number): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, opacity });
  }

  /**
   * Sets the projection for the tile layer settings.
   *
   * @param {string} projection - The desired projection for the tile layer settings.
   * @return {RasterTileLayerSettings} - The updated tile layer settings with the new projection.
   */
  setProjection(projection: string): RasterTileLayerSettings {
    return RasterTileLayerSettings.copy({ ...this, projection });
  }

  /**
   * Checks if the current instance of RasterTileLayerSettings is equal to the given model.
   * @param {RasterTileLayerSettings} model - The model to compare against.
   * @return {boolean} - True if all properties of the current instance matches the properties of the model;
   *                    otherwise, false.
   */
  public isSame(model: RasterTileLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.url !== model.url) return false;
    if (this.projection !== model.projection) return false;
    if (this.opacity !== model.opacity) return false;
    if (this.requestHeaders !== model.requestHeaders) return false;
    if (this.operation !== model.operation) return false;
    return true;
  }
}
