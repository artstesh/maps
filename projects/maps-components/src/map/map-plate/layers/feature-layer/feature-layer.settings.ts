import Style, { StyleFunction } from 'ol/style/Style';
import { IdGenerator } from '../../../common/id.generator';

export class FeatureLayerSettings {
  name: string = IdGenerator.get();
  zIndex: number = 1;
  maxZoom: number = 19;
  minZoom: number = 0;
  style?: Style | StyleFunction;

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

  public static copy(model: FeatureLayerSettings): FeatureLayerSettings {
    const result = new FeatureLayerSettings();
    result.name = model.name;
    result.maxZoom = model.maxZoom;
    result.minZoom = model.minZoom;
    result.zIndex = model.zIndex;
    result.style = model.style;
    return result;
  }
}
