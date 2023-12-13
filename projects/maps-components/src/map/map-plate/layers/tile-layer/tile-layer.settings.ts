export class TileLayerSettings {
  maxZoom: number = 19;
  minZoom: number = 0;
  opacity: number = 0.6;
  url: string = '';
  projection: string = 'EPSG:3857';

  public static copy(model: TileLayerSettings): TileLayerSettings {
    const result = new TileLayerSettings();
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.projection = model.projection;
    result.opacity = model.opacity;
    result.url = model.url;
    return result;
  }

  setUrl(url: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, url });
  }

  setMaxZoom(maxZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, maxZoom });
  }

  setMinZoom(minZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, minZoom });
  }

  setOpacity(opacity: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, opacity });
  }

  setProjection(projection: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, projection });
  }

  public isSame(model: TileLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.url !== model.url) return false;
    if (this.projection !== model.projection) return false;
    if (this.opacity !== model.opacity) return false;
    return true;
  }
}
