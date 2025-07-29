export class ImageLayerSettings {
  /**
   * Represents the tiles URL.
   * @typedef {string} url
   *
   * @example
   * 'https://example.ex/{z}/{x}/{y}.png'
   */
  url: string = '';
  /**
   * Use interpolated values when resampling.
   * By default, linear interpolation is used when resampling.
   * Set to false to use the nearest neighbor instead.
   */
  interpolate?: boolean = undefined;
  /**
   * The projection of the coordinate system.
   *
   * @type {string}
   * @default 'EPSG:3857'
   */
  projection: string = 'EPSG:3857';
  extent: number[] = [0, 0, 0, 0];
  /**
   * Additional headers that should be added to each tile request
   *
   * @type {Record<string, string>}
   * @default An empty array
   */
  requestHeaders: Record<string, string> | null = null;
  /**
   * Creates a copy of the given tile layer settings.
   *
   * @param {ImageLayerSettings} model - The tile layer settings to be copied.
   * @return {ImageLayerSettings} - A new instance of ImageLayerSettings with the same properties as the model.
   */
  public static copy(model: ImageLayerSettings): ImageLayerSettings {
    const result = new ImageLayerSettings();
    result.interpolate = model.interpolate;
    result.projection = model.projection;
    result.extent = model.extent;
    result.url = model.url;
    result.requestHeaders = model.requestHeaders;
    return result;
  }

  /**
   * Sets the URL of the ImageLayerSettings object.
   *
   * @param {string} url - The URL to be set.
   * @return {ImageLayerSettings} - The updated ImageLayerSettings object.
   */
  setUrl(url: string): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, url });
  }

  /**
   * Sets the interpolation state for the image layer settings.
   *
   * @param {boolean} [interpolate] - Use interpolated values when resampling.
   * By default, linear interpolation is used when resampling.
   * Set to false to use the nearest neighbor instead.
   * @return {ImageLayerSettings} A new instance of ImageLayerSettings with the updated interpolation setting.
   */
  setInterpolate(interpolate?: boolean): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, interpolate });
  }

  setExtent(extent: number[]): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, extent });
  }

  /**
   * Sets the requestHeaders of the ImageLayerSettings object.
   *
   * @param {Record<string, string>} requestHeaders - The headers which should be provided.
   * @return {ImageLayerSettings} - The updated ImageLayerSettings object.
   */
  setRequestHeaders(requestHeaders: Record<string, string>): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, requestHeaders });
  }

  /**
   * Sets the maximum zoom level for the tile layer.
   *
   * @param {number} maxZoom - The maximum zoom level.
   * @returns {ImageLayerSettings} - The updated tile layer settings object.
   */
  setMaxZoom(maxZoom: number): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the Tile Layer.
   *
   * @param {number} minZoom - The minimum zoom level to be set.
   * @return {ImageLayerSettings} The modified ImageLayerSettings object with the updated minimum zoom level.
   */
  setMinZoom(minZoom: number): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, minZoom });
  }

  /**
   * Sets the opacity of the ImageLayerSettings.
   *
   * @param {number} opacity - The opacity value to set. Must be a number between 0 and 1.
   * @return {ImageLayerSettings} - A new instance of ImageLayerSettings with the opacity set.
   */
  setOpacity(opacity: number): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, opacity });
  }

  /**
   * Sets the projection for the tile layer settings.
   *
   * @param {string} projection - The desired projection for the tile layer settings.
   * @return {ImageLayerSettings} - The updated tile layer settings with the new projection.
   */
  setProjection(projection: string): ImageLayerSettings {
    return ImageLayerSettings.copy({ ...this, projection });
  }

  /**
   * Checks if the current instance of ImageLayerSettings is equal to the given model.
   * @param {ImageLayerSettings} model - The model to compare against.
   * @return {boolean} - True if all properties of the current instance matches the properties of the model;
   *                    otherwise, false.
   */
  public isSame(model: ImageLayerSettings): boolean {
    if (this.url !== model.url) return false;
    if (this.projection !== model.projection) return false;
    if (this.extent !== model.extent) return false;
    if (this.interpolate !== model.interpolate) return false;
    if (this.requestHeaders !== model.requestHeaders) return false;
    return true;
  }
}
