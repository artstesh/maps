export class TileLayerSettings {
  name: string = 'tiles';
  maxZoom: number = 19;
  minZoom: number = 0;
  url: string = '';

  setUrl(url: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, url });
  }

  setName(name: string): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, name });
  }

  setMaxZoom(maxZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, maxZoom });
  }

  setMinZoom(minZoom: number): TileLayerSettings {
    return TileLayerSettings.copy({ ...this, minZoom });
  }

  public isSame(model: TileLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.url !== model.url) return false;
    if (this.name !== model.name) return false;
    return true;
  }

  public static copy(model: TileLayerSettings): TileLayerSettings {
    const result = new TileLayerSettings();
    result.name = model.name;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.url = model.url;
    return result;
  }
}
