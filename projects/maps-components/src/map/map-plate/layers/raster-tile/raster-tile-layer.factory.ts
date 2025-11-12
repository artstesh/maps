import { Injectable } from '@angular/core';
import { Raster, XYZ } from 'ol/source';
import { TileCoord } from 'ol/tilecoord';
import { get } from 'ol/proj';
import { Tile } from 'ol';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';
import ImageLayer from 'ol/layer/Image';
import RasterSource from 'ol/source/Raster';

@Injectable({
  providedIn: 'root',
})
export class RasterTileLayerFactory {
  public build(settings: RasterTileLayerSettings): ImageLayer<Raster> {
    const source = new XYZ({
      tileSize: 256,
      maxZoom: settings.maxZoom || 14,
      minZoom: settings.minZoom || 1,
      projection: get(settings.projection)!,
      tileUrlFunction: this.getTileFunc(settings),
      crossOrigin: 'Anonymous',
      tileLoadFunction: !!settings.requestHeaders
        ? (tile, src: string) => this.tileLoader(tile, src, settings.requestHeaders!)
        : undefined,
    });
    const raster = new RasterSource({
      sources: [source],
      operationType: 'image',
      operation: (arg) => settings.operation(arg),
    });
    return new ImageLayer({ source: raster, opacity: settings.opacity });
  }

  private getTileFunc(settings: RasterTileLayerSettings): (tileCoord: TileCoord) => string {
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

  private tileLoader(tile: Tile, src: string, headers: Record<string, string>) {
    const client = new XMLHttpRequest();
    client.open('GET', src);
    client.responseType = 'arraybuffer';
    Object.keys(headers).forEach((k: string) => client.setRequestHeader(k, headers[k]));
    client.onload = function () {
      if (this.response !== undefined) {
        const arrayBufferView = new Uint8Array(this.response);
        const blob = new Blob([arrayBufferView], { type: 'image/png' });
        const urlCreator = window.URL || (window as any).webkitURL;
        (tile as any).getImage().src = urlCreator.createObjectURL(blob);
      }
    };
    client.send();
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
