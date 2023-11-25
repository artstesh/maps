import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
import OSM from 'ol/source/OSM';
import { Map } from 'ol';
import { MapRenderedEvent } from "../../../messages";
import { MapPostboyService } from "../../../services/map-postboy.service";

@Component({
  selector: 'lib-osm-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OsmTileLayerComponent extends DestructibleComponent implements OnInit {
  private _url: string = '';
  private _map?: Map;

  @Input() set url(value: string | undefined) {
    if (!value || this._url === value) return;
    this._url = value;
    this.initLayer();
  }

  public layer?: TileLayer<TileSource>;

  constructor(private postboy: MapPostboyService) {
    super();
  }

  ngOnInit(): void {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this._map = m.map;
      this.initLayer();
    });
  }

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
      visible: true,
    });
    this.layer.set('name', 'osm-tile-layer');
    this._map.addLayer(this.layer);
  }
}
