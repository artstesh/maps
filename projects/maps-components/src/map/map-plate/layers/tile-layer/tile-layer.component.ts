import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MapPlateComponent } from '../../map-plate.component';
import { DestructibleComponent } from '../../../common/destructible.component';
import { XYZ } from 'ol/source';
import { get } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { TileCoord } from 'ol/tilecoord';
import TileSource from 'ol/source/Tile';
import { TileLayerSettings } from './tile-layer.settings';

@Component({
  selector: 'lib-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileLayerComponent extends DestructibleComponent implements OnInit {
  _settings: TileLayerSettings = new TileLayerSettings();

  @Input() set settings(value: TileLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  private _opacity = 1;
  public source?: XYZ;
  public layer?: TileLayer<TileSource>;

  constructor(private parent: MapPlateComponent, private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.initLayer();
  }

  ngOnDestroy(): void {
    if (this.layer) {
      this.parent.map.removeLayer(this.layer);
    }
    // @ts-ignore
    this.layer?.setMap(null);
  }

  private initLayer(): void {
    if (!this._settings.url) return;
    if (this.layer) this.parent.map.removeLayer(this.layer);
    this.source = new XYZ({
      tileSize: 256,
      maxZoom: this._settings.maxZoom,
      minZoom: this._settings.minZoom,
      projection: get('EPSG:3857')!,
      tileUrlFunction: this.getTileFunc(),
      // https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported/46637963#46637963
      crossOrigin: 'Anonymous',
    });
    this.layer = new TileLayer({
      preload: 0,
      source: this.source,
      opacity: (this._opacity = null ? 1 : this._opacity),
    });
    this.layer.set('name', this._settings.name);
    this.parent.map.addLayer(this.layer);
  }

  private getTileFunc(): (tileCoord: TileCoord) => string {
    return (tileCoord) => {
      const zoom = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      const normalizedCoord = this.getNormalizedCoord({ x: x, y: y }, zoom);
      const bound = 1 << zoom;
      return `${this._settings.url}/${zoom}/${normalizedCoord?.x || x}/${bound - (normalizedCoord?.y || y) - 1}`;
    };
  }

  private getNormalizedCoord(coord: { x: number; y: number }, zoom: number) {
    const y = coord.y;
    let x = coord.x;
    const tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }
    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      x = ((x % tileRange) + tileRange) % tileRange;
    }
    return { x: x, y: y };
  }
}
