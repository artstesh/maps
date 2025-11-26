import { Style as WebGlStyle } from 'ol/layer/WebGLTile';

export class CogLayerSettings {
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
  cacheSize: number | undefined = undefined;
  /**
   * Represents the tiles URL.
   * @typedef {string} url
   *
   * @example
   * 'https://example.ex/data.tiff'
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

  /**
   * Represents the extent or bounding box of a spatial object, defined as an array of numbers.
   * Typically used to store the minimum and maximum coordinates of a rectangle or geometric shape.
   *
   * The array is expected to contain numerical values in the format:
   * [minX, minY, maxX, maxY], where:
   * - minX: Minimum X-coordinate (leftmost edge).
   * - minY: Minimum Y-coordinate (bottom edge).
   * - maxX: Maximum X-coordinate (rightmost edge).
   * - maxY: Maximum Y-coordinate (topmost edge).
   *
   * If undefined, it indicates that no extent or bounding box is set.
   */
  extent: number[] | undefined = undefined;

  /**
   * Represents the style configuration for WebGL rendering.
   *
   * This variable holds the style settings used for rendering
   * graphical content in a WebGL context. It can either be an
   * object of type WebGlStyle defining specific style properties
   * or null, indicating that no style is currently defined.
   */
  style: WebGlStyle | null = null;

  /**
   * Represents the stacking order of an element.
   * A higher value means the element will appear in front of elements with lower z-index values.
   * Default value: 1
   */
  zIndex: number = 1;

  /**
   * Creates a copy of the given tile layer settings.
   *
   * @param {CogLayerSettings} model - The tile layer settings to be copied.
   * @return {CogLayerSettings} - A new instance of CogLayerSettings with the same properties as the model.
   */
  public static copy(model: CogLayerSettings): CogLayerSettings {
    const result = new CogLayerSettings();
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.projection = model.projection;
    result.opacity = model.opacity;
    result.url = model.url;
    result.requestHeaders = model.requestHeaders;
    result.style = model.style;
    result.extent = model.extent;
    result.zIndex = model.zIndex;
    result.cacheSize = model.cacheSize;
    return result;
  }

  /**
   * Sets the URL of the CogLayerSettings object.
   *
   * @param {string} url - The URL to be set.
   * @return {CogLayerSettings} - The updated CogLayerSettings object.
   */
  setUrl(url: string): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, url });
  }

  /**
   * Updates the style settings of the current CogLayerSettings instance.
   *
   * @param {WebGlStyle | null} style - The style to be applied to the layer settings. Accepts a WebGlStyle object or null to reset the style.
   * @return {CogLayerSettings} A new instance of CogLayerSettings with the updated style applied.
   */
  setStyle(style: WebGlStyle | null): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, style });
  }

  /**
   * Sets the requestHeaders of the CogLayerSettings object.
   *
   * @param {Record<string, string>} requestHeaders - The headers which should be provided.
   * @return {CogLayerSettings} - The updated CogLayerSettings object.
   */
  setRequestHeaders(requestHeaders: Record<string, string>): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, requestHeaders });
  }

  /**
   * Sets the maximum zoom level for the tile layer.
   *
   * @param {number} maxZoom - The maximum zoom level.
   * @returns {CogLayerSettings} - The updated tile layer settings object.
   */
  setMaxZoom(maxZoom: number): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the Tile Layer.
   *
   * @param {number} minZoom - The minimum zoom level to be set.
   * @return {CogLayerSettings} The modified CogLayerSettings object with the updated minimum zoom level.
   */
  setMinZoom(minZoom: number): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, minZoom });
  }

  /**
   * Sets the opacity of the CogLayerSettings.
   *
   * @param {number} opacity - The opacity value to set. Must be a number between 0 and 1.
   * @return {CogLayerSettings} - A new instance of CogLayerSettings with the opacity set.
   */
  setOpacity(opacity: number): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, opacity });
  }

  /**
   * Sets the projection for the tile layer settings.
   *
   * @param {string} projection - The desired projection for the tile layer settings.
   * @return {CogLayerSettings} - The updated tile layer settings with the new projection.
   */
  setProjection(projection: string): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, projection });
  }

  /**
   * Sets the extent of the layer and returns a new instance of CogLayerSettings with the updated extent.
   *
   * @param {number[]} extent - An array of numbers representing the extent to be set.
   * @return {CogLayerSettings} A new instance of CogLayerSettings with the specified extent.
   */
  setExtent(extent: number[]): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, extent });
  }

  /**
   * Sets the z-index for the layer and returns a new instance with the updated z-index.
   *
   * @param {number} zIndex - The z-index value to set for the layer.
   * @return {CogLayerSettings} A new instance of CogLayerSettings with the updated z-index.
   */
  setZIndex(zIndex: number): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, zIndex });
  }

  /**
   * Sets the cache size for the CogLayerSettings instance.
   *
   * @param {number} cacheSize - The size of the cache to be set.
   * @return {CogLayerSettings} A new instance of CogLayerSettings with the updated cache size.
   */
  setCacheSize(cacheSize: number): CogLayerSettings {
    return CogLayerSettings.copy({ ...this, cacheSize });
  }

  /**
   * Checks if the current instance of CogLayerSettings is equal to the given model.
   * @param {CogLayerSettings} model - The model to compare against.
   * @return {boolean} - True if all properties of the current instance matches the properties of the model;
   *                    otherwise, false.
   */
  public isSame(model: CogLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.url !== model.url) return false;
    if (this.projection !== model.projection) return false;
    if (this.opacity !== model.opacity) return false;
    if (this.requestHeaders !== model.requestHeaders) return false;
    if (this.style !== model.style) return false;
    if (this.extent !== model.extent) return false;
    if (this.zIndex !== model.zIndex) return false;
    if (this.cacheSize !== model.cacheSize) return false;
    return true;
  }
}
