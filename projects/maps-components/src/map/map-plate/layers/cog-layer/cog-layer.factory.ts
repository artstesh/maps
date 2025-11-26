import { Injectable } from '@angular/core';
import { get } from 'ol/proj';
import GeoTIFF from 'ol/source/GeoTIFF';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { CogLayerSettings } from './cog-layer.settings';

/**
 * Factory service for creating and initializing WebGLTileLayer instances
 * with the provided settings.
 *
 * Designed to work with Cloud Optimized GeoTIFF (COG) sources by utilizing
 * the GeoTIFF tile source and other related configuration options.
 *
 * This service is provided in the root level of the dependency injection system.
 */
@Injectable({
  providedIn: 'root',
})
export class CogLayerFactory {
  public build(settings: CogLayerSettings): WebGLTileLayer {
    const source = new GeoTIFF({
      sources: [{ url: settings.url, nodata: 0 }],
      projection: get(settings.projection)!,
      sourceOptions: {
        headers: settings.requestHeaders || undefined,
        cacheSize: settings.cacheSize
      },
    });
    return new WebGLTileLayer({
      source,
      zIndex: settings.zIndex,
      extent: settings.extent,
      opacity: settings.opacity,
      maxZoom: settings.maxZoom,
      minZoom: settings.minZoom,
      style: settings.style || undefined,
    });
  }
}
