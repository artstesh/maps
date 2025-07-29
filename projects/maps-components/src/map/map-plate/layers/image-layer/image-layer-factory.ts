import { Injectable } from '@angular/core';
import Static from 'ol/source/ImageStatic';
import { ImageLayerSettings } from './image-layer.settings';
import ImageLayer from 'ol/layer/Image';
import { get, Projection } from 'ol/proj';

@Injectable({
  providedIn: 'root',
})
export class ImageLayerFactory {
  public build(settings: ImageLayerSettings): ImageLayer<Static> {
    const source = new Static({
      url: settings.url,
      interpolate: settings.interpolate,
      crossOrigin: 'Anonymous',
      projection: get(settings.projection)!,
      imageExtent: settings.extent,
    });
    return new ImageLayer({ source });
  }
}
