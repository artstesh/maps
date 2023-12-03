import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';

@Component({
  selector: 'lib-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileLayerComponent extends DestructibleComponent {
  public source?: XYZ;
  public layer?: TileLayer<TileSource>;

  constructor() {
    super();
  }
  //
  // constructor(private postboy: MapPostboyService, private factory: FeatureLayerFactory) {
  //   super();
  //   postboy
  //     .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
  //     .pipe(
  //       filter((m) => !!m),
  //       first(),
  //     )
  //     .subscribe((m) => this.initLayer());
  // }
  //
  // _settings: TileLayerSettings = new TileLayerSettings();
  //
  // @Input() set settings(value: TileLayerSettings | undefined) {
  //   if (!value || this._settings.isSame(value)) return;
  //   this._settings = value;
  //   this.initLayer();
  // }
  //
  // ngOnInit(): void {
  //   this.initLayer();
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.layer) {
  //     this.map.removeLayer(this.layer);
  //   }
  //   // @ts-ignore
  //   this.layer?.setMap(null);
  // }
  //
  // private initLayer(): void {
  //   if (!this._settings.url) return;
  //   if (this.layer) this.parent.map.removeLayer(this.layer);
  //   this.source = new XYZ({
  //     tileSize: 256,
  //     maxZoom: this._settings.maxZoom,
  //     minZoom: this._settings.minZoom,
  //     projection: get('EPSG:3857')!,
  //     tileUrlFunction: this.getTileFunc(),
  //     // https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported/46637963#46637963
  //     crossOrigin: 'Anonymous',
  //   });
  //   this.layer = new TileLayer({
  //     preload: 0,
  //     source: this.source,
  //     opacity: this._settings.opacity,
  //   });
  //   this.layer.set('name', this._settings.name);
  //   this.postboy.fire(new AddLayerCommand(this.layer));
  // }
  //
  // private getTileFunc(): (tileCoord: TileCoord) => string {
  //   return (tileCoord) => {
  //     const zoom = tileCoord[0];
  //     const x = tileCoord[1];
  //     const y = tileCoord[2];
  //     const normalizedCoord = this.getNormalizedCoord({ x: x, y: y }, zoom);
  //     const bound = 1 << zoom;
  //     return `${this._settings.url}/${zoom}/${normalizedCoord?.x || x}/${bound - (normalizedCoord?.y || y) - 1}`;
  //   };
  // }
  //
  // private getNormalizedCoord(coord: { x: number; y: number }, zoom: number) {
  //   const y = coord.y;
  //   let x = coord.x;
  //   const tileRange = 1 << zoom;
  //
  //   // don't repeat across y-axis (vertically)
  //   if (y < 0 || y >= tileRange) {
  //     return null;
  //   }
  //   // repeat across x-axis
  //   if (x < 0 || x >= tileRange) {
  //     x = ((x % tileRange) + tileRange) % tileRange;
  //   }
  //   return { x: x, y: y };
  // }
}
