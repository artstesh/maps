import { IdGenerator } from '../../../common/id.generator';
import Style, { StyleFunction } from 'ol/style/Style';
import { IIdentified } from '../../../models/i-identified';

export class ClusterLayerSettings {
  name: string = IdGenerator.get();
  zIndex: number = 1;
  maxZoom: number = 19;
  minZoom: number = 0;
  distance: number = 20;
  bbox: boolean = false;
  clusterCancel: number = 14;
  style?: (features: IIdentified[]) => Style;

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

  setZIndex(zIndex: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, zIndex });
  }

  setDistance(distance: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, distance });
  }

  setName(name: string): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, name });
  }

  setMaxZoom(maxZoom: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, maxZoom });
  }

  setMinZoom(minZoom: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, minZoom });
  }

  setClusterCancel(clusterCancel: number): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, clusterCancel });
  }

  setBbox(bbox: boolean): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, bbox });
  }

  setStyle(style: (features: IIdentified[]) => Style | StyleFunction): ClusterLayerSettings {
    return ClusterLayerSettings.copy({ ...this, style });
  }

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
