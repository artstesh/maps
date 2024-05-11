/**
 * Represents the settings for a zoom control.
 */
export class ZoomControlSettings {
  /**
   * The CSS class name of the control element.
   *
   * @type {string}
   */
  controlClass: string = 'ol-zoom';
  /**
   * The CSS class name for zoom in button.
   * @type {string}
   */
  zoomInClass: string = 'ol-zoom-in';
  /**
   * The CSS class name for the zoom out button element.
   *
   * @type {string}
   */
  zoomOutClass: string = 'ol-zoom-out';
  /**
   * The label for the zoom in action.
   *
   * @type {string}
   */
  zoomInLabel: string = 'Zoom In';
  /**
   * The label for the zoom out control.
   *
   * @type {string}
   */
  zoomOutLabel: string = 'Zoom Out';

  /**
   * Copies the provided ZoomControlSettings object.
   *
   * @param {ZoomControlSettings} model - The ZoomControlSettings object to be copied.
   * @return {ZoomControlSettings} - The copied ZoomControlSettings object.
   */
  public static copy(model: ZoomControlSettings): ZoomControlSettings {
    const result = new ZoomControlSettings();
    result.controlClass = model.controlClass;
    result.zoomInClass = model.zoomInClass;
    result.zoomOutClass = model.zoomOutClass;
    result.zoomInLabel = model.zoomInLabel;
    result.zoomOutLabel = model.zoomOutLabel;
    return result;
  }

  /**
   * Checks if the current ZoomControlSettings object is equal to the given model.
   *
   * @param {ZoomControlSettings} model - The ZoomControlSettings object to compare with.
   *
   * @return {boolean} - true if the current object is equal to the given model, false otherwise.
   */
  public isSame(model: ZoomControlSettings): boolean {
    if (this.zoomInClass !== model.zoomInClass) return false;
    if (this.zoomOutClass !== model.zoomOutClass) return false;
    if (this.zoomInLabel !== model.zoomInLabel) return false;
    if (this.controlClass !== model.controlClass) return false;
    if (this.zoomOutLabel !== model.zoomOutLabel) return false;
    return true;
  }

  /**
   * Sets the zoom in label of the Zoom Control Settings.
   *
   * @param {string} zoomInLabel - The label for the zoom in button.
   * @return {ZoomControlSettings} - The new Zoom Control Settings object with the updated zoom in label.
   */
  setZoomInLabel(zoomInLabel: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomInLabel });
  }

  /**
   * Sets the zoomOutClass property of the ZoomControlSettings object.
   *
   * @param {string} zoomOutClass - The CSS class to be assigned to the zoom out button.
   * @return {ZoomControlSettings} - The updated ZoomControlSettings object with the new zoomOutClass value.
   */
  setZoomOutClass(zoomOutClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomOutClass });
  }

  /**
   * Sets the zoom in class for the zoom control settings.
   *
   * @param {string} zoomInClass - The new zoom in class to be set.
   * @return {ZoomControlSettings} - The updated zoom control settings.
   */
  setZoomInClass(zoomInClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomInClass });
  }

  /**
   * Set the label for the zoom out control.
   *
   * @param {string} zoomOutLabel - The label for the zoom out control.
   * @returns {ZoomControlSettings} - The updated zoom control settings.
   */
  setZoomOutLabel(zoomOutLabel: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomOutLabel });
  }

  /**
   * Sets the control class for the ZoomControlSettings.
   *
   * @param {string} controlClass - The class name of the control to be set.
   *
   * @return {ZoomControlSettings} - The modified ZoomControlSettings object.
   */
  setControlClass(controlClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, controlClass });
  }
}
