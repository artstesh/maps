import { MapLyrs } from './map-lyrs.enum';

export class MapSettings {
  center: number[] = [0, 0];
  maxZoom: number = 19;
  minZoom: number = 0;
  zoom: number = 4;
  lyrs: MapLyrs = MapLyrs.Hybrid;
  language = 'en';

  setCenter(center: number[]): MapSettings {
    return MapSettings.copy({ ...this, center });
  }

  setMaxZoom(maxZoom: number): MapSettings {
    return MapSettings.copy({ ...this, maxZoom });
  }

  setMinZoom(minZoom: number): MapSettings {
    return MapSettings.copy({ ...this, minZoom });
  }

  setZoom(zoom: number): MapSettings {
    return MapSettings.copy({ ...this, zoom });
  }

  setLyrs(lyrs: MapLyrs): MapSettings {
    return MapSettings.copy({ ...this, lyrs });
  }

  setLanguage(language: string): MapSettings {
    return MapSettings.copy({ ...this, language });
  }

  public isSame(model: MapSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.zoom !== model.zoom) return false;
    if (this.lyrs !== model.lyrs) return false;
    if (this.language !== model.language) return false;
    return this.center.length !== model.center.length
      || !!this.center.filter((c, i) => c !== model.center[i]);
  }

  public static copy(model: MapSettings): MapSettings {
    const result = new MapSettings();
    result.center = model.center;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.zoom = model.zoom;
    result.lyrs = model.lyrs;
    result.language = model.language;
    return result;
  }
}
