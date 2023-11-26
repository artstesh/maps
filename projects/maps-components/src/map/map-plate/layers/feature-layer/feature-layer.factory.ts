import { Injectable } from '@angular/core';
import { FeatureLayerSettings } from "./feature-layer.settings";
import BaseLayer from "ol/layer/Base";
import { Vector as Source } from "ol/source";
import { Vector as Layer } from "ol/layer";

@Injectable({
  providedIn: 'root'
})
export class FeatureLayerFactory {
  public build(settings: FeatureLayerSettings): BaseLayer {
    const source = new Source({});
    const layer = new Layer({
      source: source,
      maxZoom: settings.maxZoom,
      minZoom: settings.minZoom,
      zIndex: settings.zIndex,
    });
    if (settings.style) layer.setStyle(settings.style);
    layer.set('name', settings.name);
    return layer;
  }
}
