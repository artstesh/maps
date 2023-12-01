import Style, { StyleFunction } from 'ol/style/Style';
import { IdGenerator } from '../../../common/id.generator';

const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 2 15 21" width="30" height="40"><path fill="#f55" stroke="#FFF" stroke-width="1"
  d="M10.5 3.5c3.866 0 7 3.134 7 6.999 0 3.867-4.959 7.197-7 11.001-2.075-3.965-7-7.134-7-11.001 0-3.865 3.134-6.999 7-6.999z"/></svg>`;

export class FeatureLayerSettings {
  name: string = IdGenerator.get();
  zIndex: number = 1;
  maxZoom: number = 19;
  minZoom: number = 0;
  style?: Style | StyleFunction;

  public static copy(model: FeatureLayerSettings): FeatureLayerSettings {
    const result = new FeatureLayerSettings();
    result.name = model.name;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.zIndex = model.zIndex;
    result.style = model.style;
    return result;
  }

  setZIndex(zIndex: number): FeatureLayerSettings {
    return FeatureLayerSettings.copy({ ...this, zIndex });
  }

  setName(name: string): FeatureLayerSettings {
    return FeatureLayerSettings.copy({ ...this, name });
  }

  setMaxZoom(maxZoom: number): FeatureLayerSettings {
    return FeatureLayerSettings.copy({ ...this, maxZoom });
  }

  setMinZoom(minZoom: number): FeatureLayerSettings {
    return FeatureLayerSettings.copy({ ...this, minZoom });
  }

  setStyle(style: Style | StyleFunction): FeatureLayerSettings {
    return FeatureLayerSettings.copy({ ...this, style });
  }

  public isSame(model: FeatureLayerSettings): boolean {
    if (this.maxZoom !== model.maxZoom) return false;
    if (this.minZoom !== model.minZoom) return false;
    if (this.zIndex !== model.zIndex) return false;
    if (this.name !== model.name) return false;
    if (this.style !== model.style) return false;
    return true;
  }
}
