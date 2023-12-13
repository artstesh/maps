import { Injectable } from '@angular/core';
import { XYZ } from 'ol/source';
import { TileLayerSettings } from './tile-layer.settings';
import { TileCoord } from 'ol/tilecoord';
import { get } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Injectable({
  providedIn: 'root',
})
export class TileLayerFactory {
  public build(settings: TileLayerSettings): TileLayer<XYZ> {
    const source = new XYZ({
      tileSize: 256,
      maxZoom: settings.maxZoom || 14,
      minZoom: settings.minZoom || 1,
      projection: get(settings.projection)!,
      tileUrlFunction: this.getTileFunc(settings),
      crossOrigin: 'Anonymous',
    });
    return new TileLayer({ source, opacity: settings.opacity });
  }

  private getTileFunc(settings: TileLayerSettings): (tileCoord: TileCoord) => string {
    return (tileCoord) => {
      const zoom = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      const normalizedCoord = this.getNormalizedCoord({ x: x, y: y }, zoom);
      const bound = 1 << zoom;
      return settings.url
        .replace('{x}', String(normalizedCoord?.x || x))
        .replace('{z}', String(zoom))
        .replace('{y}', String(bound - (normalizedCoord?.y || y) - 1));
    };
  }

  private getNormalizedCoord(coord: { x: number; y: number }, zoom: number) {
    const y = coord.y;
    let x = coord.x;
    const tileRange = 1 << zoom;
    if (y < 0 || y >= tileRange) return null;
    if (x < 0 || x >= tileRange) x = ((x % tileRange) + tileRange) % tileRange;
    return { x: x, y: y };
  }
}
