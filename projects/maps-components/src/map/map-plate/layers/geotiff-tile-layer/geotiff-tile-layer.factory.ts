import { GeoTIFF } from 'ol/source';
import { Injectable } from '@angular/core';
import { GeotiffTileLayerSettings } from './geotiff-tile-layer.settings';
import TileLayer from 'ol/layer/WebGLTile';

@Injectable({
  providedIn: 'root',
})
export class GeotiffTileLayerFactory {
  public build(settings: GeotiffTileLayerSettings): TileLayer {
    const source = new GeoTIFF({
      sources: [
        {
          url: settings.url,
          min: settings.min,
          max: settings.max,
          nodata: settings.nodata
        },
      ],
      sourceOptions: { blockSize: settings.blockSize },
      normalize: settings.normalize,
    });
    return new TileLayer({
      style: settings.style,
      source: source,
      zIndex: settings.zIndex,
      opacity: settings.opacity,
    });
  }
}
