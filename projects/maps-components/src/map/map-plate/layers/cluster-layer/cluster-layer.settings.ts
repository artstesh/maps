import { IdGenerator } from '../../../common/id.generator';
import Style, { StyleFunction } from 'ol/style/Style';
import { IIdentified } from '../../../models/i-identified';

export class ClusterLayerSettings {
  name: string = IdGenerator.get();
  zIndex: number = 1;
  /**
   * The maximum view zoom level (inclusive) at which this layer will be visible.
   *
   * @type {number}
   * @default 19
   */
  maxZoom: number = 19;
  /**
   * The minimum view zoom level (exclusive) at which this layer will be visible.
   *
   * @type {number}
   */
  minZoom: number = 0;
  /**
   * Distance in pixels within which features will be clustered together.
   *
   * @type {number}
   */
  distance: number = 20;
  bbox: boolean = false;
  clusterCancel: number = 14;
  style?: (features: IIdentified[]) => Style;

  /**
   * Creates a copy of the given ClusterLayerSettings object.
   *
   * @param {ClusterLayerSettings} model - The ClusterLayerSettings object to be copied.
   * @returns {ClusterLayerSettings} - A new ClusterLayerSettings object that is a copy of the original object.
   */
  public static copy(model: ClusterLayerSettings): ClusterLayerSettings {
    const result = new ClusterLayerSettings();
    result.name = model.name;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.zIndex = model.zIndex;
    result.bbox = model.bbox;
    result.clusterCancel = model.clusterCancel;
    result.distance = model.distance;
    result.style = model.style;
    return result;
  }

  /**
   * Set the z-index for the ClusterLayer.
   *
   * @param {number} zIndex - The new z-index for the ClusterLayer.
   * @return {ClusterLayerSettings} - The updated ClusterLayerSettings object.
   */
  setZIndex(zIndex: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, zIndex });
  }

  /**
   * Sets the distance value for ClusterLayerSettings.
   *
   * @param {number} distance - The distance value to be set.
   * @return {ClusterLayerSettings} - The modified ClusterLayerSettings object.
   */
  setDistance(distance: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, distance });
  }

  /**
   * Sets the name of the ClusterLayerSettings object.
   *
   * @param {string} name - The name to set for the ClusterLayerSettings.
   * @return {ClusterLayerSettings} - A new ClusterLayerSettings object with the updated name.
   */
  setName(name: string): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, name });
  }

  /**
   * Sets the maximum zoom level for the Cluster Layer.
   *
   * @param {number} maxZoom - The maximum zoom level to be set.
   * @return {ClusterLayerSettings} - The updated ClusterLayerSettings object.
   */
  setMaxZoom(maxZoom: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, maxZoom });
  }

  /**
   * Sets the minimum zoom level for the ClusterLayerSettings.
   *
   * @param {number} minZoom - The minimum zoom level to set.
   * @return {ClusterLayerSettings} - The updated ClusterLayerSettings object.
   */
  setMinZoom(minZoom: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, minZoom });
  }

  /**
   * Sets the cluster cancel number for the ClusterLayerSettings.
   *
   * @param {number} clusterCancel - The new cluster cancel number.
   * @returns {ClusterLayerSettings} - The updated ClusterLayerSettings object.
   */
  setClusterCancel(clusterCancel: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, clusterCancel });
  }

  /**
   * Sets the value of 'bbox' property in the ClusterLayerSettings object.
   *
   * @param {boolean} bbox - A boolean value indicating whether to include bounding box calculation in the cluster layer settings.
   * @returns {ClusterLayerSettings} - The updated ClusterLayerSettings object with the newly set 'bbox' value.
   */
  setBbox(bbox: boolean): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, bbox });
  }

  /**
   * Sets the style for the ClusterLayerSettings.
   *
   * @param {function} style - A function that takes an array of identified features as input and returns a Style or StyleFunction.
   *
   * @return {ClusterLayerSettings} - The updated ClusterLayerSettings object with the new style applied.
   */
  setStyle(style: (features: IIdentified[]) => Style | StyleFunction): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, style });
  }

  /**
   * Checks if the current ClusterLayerSettings object is the same as the specified model.
   *
   * @param {ClusterLayerSettings} model - The model to compare with the current object.
   *
   * @return {boolean} - Returns true if the current ClusterLayerSettings object is the same as the specified model, otherwise false.
   */
  public isSame(model: ClusterLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.zIndex !== model.zIndex) return false;
    if (this.name !== model.name) return false;
    if (this.distance !== model.distance) return false;
    if (this.clusterCancel !== model.clusterCancel) return false;
    if (this.bbox !== model.bbox) return false;
    if (this.style !== model.style) return false;
    return true;
  }
}
