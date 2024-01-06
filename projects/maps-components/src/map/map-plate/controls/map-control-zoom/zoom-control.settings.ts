export class ZoomControlSettings {
  controlClass: string = 'ol-zoom';
  zoomInClass: string = 'ol-zoom-in';
  zoomOutClass: string = 'ol-zoom-out';
  zoomInLabel: string = 'Zoom In';
  zoomOutLabel: string = 'Zoom Out';

  public static copy(model: ZoomControlSettings): ZoomControlSettings {
    const result = new ZoomControlSettings();
    result.controlClass = model.controlClass;
    result.zoomInClass = model.zoomInClass;
    result.zoomOutClass = model.zoomOutClass;
    result.zoomInLabel = model.zoomInLabel;
    result.zoomOutLabel = model.zoomOutLabel;
    return result;
  }

  public isSame(model: ZoomControlSettings): boolean {
    if (this.zoomInClass !== model.zoomInClass) return false;
    if (this.zoomOutClass !== model.zoomOutClass) return false;
    if (this.zoomInLabel !== model.zoomInLabel) return false;
    if (this.controlClass !== model.controlClass) return false;
    if (this.zoomOutLabel !== model.zoomOutLabel) return false;
    return true;
  }

  setZoomInLabel(zoomInLabel: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomInLabel });
  }

  setZoomOutClass(zoomOutClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomOutClass });
  }

  setZoomInClass(zoomInClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomInClass });
  }

  setZoomOutLabel(zoomOutLabel: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, zoomOutLabel });
  }

  setControlClass(controlClass: string): ZoomControlSettings {
    return ZoomControlSettings.copy({ ...this, controlClass });
  }
}
