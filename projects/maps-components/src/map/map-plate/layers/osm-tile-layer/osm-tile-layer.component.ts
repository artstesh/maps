import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
import OSM from 'ol/source/OSM';
import { Map } from 'ol';

@Component({
  selector: 'art-osm-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OsmTileLayerComponent extends DestructibleComponent implements OnInit {
  public layer?: TileLayer<TileSource>;

  constructor() {
    super();
  }

  private _url: string = '';

  @Input() set url(value: string | undefined) {
    if (!value || this._url === value) return;
    this._url = value;
    this.initLayer();
  }

  private _map?: Map;

  @Input() set map(value: Map | undefined) {
    if (!value || this._map === value) return;
    this._map = value;
    this.initLayer();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.layer) {
      this._map?.removeLayer(this.layer);
    }
    // @ts-ignore
    this.layer?.setMap(null);
  }

  private initLayer(): void {
    if (!this._url || !this._map) return;
    if (this.layer) this._map.removeLayer(this.layer);
    this.layer = new TileLayer({
      source: new OSM({
        url: this._url,
      }),
    });
    this.layer.set('name', 'osm-tile-layer');
    this._map.addLayer(this.layer);
  }
}
