import { Style } from 'ol/layer/WebGLTile';

export class GeotiffTileLayerSettings {
  /**
   * The maximum source data value. Rendered values are scaled from 0 to 1 based on the configured min and max.
   *
   * @type {number | undefined}
   * @default undefined
   */
  max?: number = undefined;
  /**
   * The minimum source data value. Rendered values are scaled from 0 to 1 based on the configured min and max.
   *
   * @type {number | undefined}
   * @default undefined
   */
  min?: number = undefined;
  /**
   * Represents the URL of the tif.
   * @typedef {string} url
   *
   * @example
   * 'https://example.ex/geotiff.tif'
   */
  url: string = '';
  /**
   * Style to apply to the layer.
   *
   * @type {Style | undefined}
   */
  style?: Style | undefined;

  /**
   * The opacity of an element.
   *
   * @type {number}
   * @default 0.6
   */
  opacity: number = 0.6;
  /**
   * The priority of showing - layers with higher zIndex cover others in case of collisions
   */
  zIndex: number = 1;
  /**
   * Represents the size of a block in a specific context, typically used to define dimensions or capacity.
   *
   * Optional property that, if defined, specifies the numerical value for the block size.
   *
   * @type {number|undefined}
   */
  blockSize?: number = undefined;

  /**
   * Creates a copy of the given tile layer settings.
   *
   * @param {GeotiffTileLayerSettings} model - The tile layer settings to be copied.
   * @return {GeotiffTileLayerSettings} - A new instance of GeotiffTileLayerSettings with the same properties as the model.
   */
  public static copy(model: GeotiffTileLayerSettings): GeotiffTileLayerSettings {
    const result = new GeotiffTileLayerSettings();
    result.max = model.max;
    result.min = model.min;
    result.zIndex = model.zIndex;
    result.style = model.style;
    result.blockSize = model.blockSize;
    result.opacity = model.opacity;
    result.url = model.url;
    return result;
  }

  /**
   * Sets the URL of the GeotiffTileLayerSettings object.
   *
   * @param {string} url - The URL to be set.
   * @return {GeotiffTileLayerSettings} - The updated GeotiffTileLayerSettings object.
   */
  setUrl(url: string): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, url });
  }
  /**
   * Updates the style settings for the GeotiffTileLayerSettings and returns a new instance with the updated style.
   *
   * @param {Style} [style] - An optional style object that defines the new style settings.
   * @return {GeotiffTileLayerSettings} A new instance of GeotiffTileLayerSettings with the updated style.
   */
  setStyle(style?: Style): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, style });
  }

  /**
   * Sets the maximum value for the GeotiffTileLayerSettings.
   *
   * @param {number} max - The maximum value to set.
   * @return {GeotiffTileLayerSettings} A new instance of GeotiffTileLayerSettings with the updated maximum value.
   */
  setMax(max: number): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, max: max });
  }

  /**
   * Sets the z-index for the GeotiffTileLayerSettings.
   *
   * @param {number} zIndex - The new z-index to be assigned.
   * @return {GeotiffTileLayerSettings} A new GeotiffTileLayerSettings instance with the updated z-index.
   */
  setZIndex(zIndex: number): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, zIndex });
  }

  /**
   * Sets the minimum value for the GeotiffTileLayerSettings.
   *
   * @param {number} min - The new minimum value to be set.
   * @return {GeotiffTileLayerSettings} A new instance of GeotiffTileLayerSettings with the updated minimum value.
   */
  setMin(min: number): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, min: min });
  }

  /**
   * Sets the opacity of the GeotiffTileLayerSettings.
   *
   * @param {number} opacity - The opacity value to set. Must be a number between 0 and 1.
   * @return {GeotiffTileLayerSettings} - A new instance of GeotiffTileLayerSettings with the opacity set.
   */
  setOpacity(opacity: number): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, opacity });
  }

  /**
   * Sets the block size for the GeoTIFF tile layer.
   *
   * @param {number} blockSize - The size of the block to be set. This value typically defines the number of pixels for determining how data is grouped in tiles.
   * @return {GeotiffTileLayerSettings} A new instance of `GeotiffTileLayerSettings` with the updated block size.
   */
  setBlockSize(blockSize: number): GeotiffTileLayerSettings {
    return GeotiffTileLayerSettings.copy({ ...this, blockSize });
  }

  /**
   * Checks if the current instance of GeotiffTileLayerSettings is equal to the given model.
   * @param {GeotiffTileLayerSettings} model - The model to compare against.
   * @return {boolean} - True if all properties of the current instance matches the properties of the model;
   *                    otherwise, false.
   */
  public isSame(model: GeotiffTileLayerSettings): boolean {
    if (this.max !== model.max) return false;
    if (this.min !== model.min) return false;
    if (this.zIndex !== model.zIndex) return false;
    if (this.url !== model.url) return false;
    if (this.style !== model.style) return false;
    if (this.blockSize !== model.blockSize) return false;
    if (this.opacity !== model.opacity) return false;
    return true;
  }
}
