import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
import { MapPlateComponent } from '../../map-plate.component';
import { get } from 'ol/proj';
import OSM from "ol/source/OSM";

@Component({
  selector: 'lib-osm-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OsmTileLayerComponent extends DestructibleComponent implements OnInit {
  _url: string = '';

  @Input() set url(value: string | undefined) {
    if (!value || this._url === value) return;
    this._url = value;
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
    if (!this._url || !this.parent?.map) return;
    if (this.layer) this.parent.map.removeLayer(this.layer);
    this.layer = new TileLayer({
      source: new OSM({
        url: this._url
      }),
      visible: false
    });
    this.layer.set('name', 'osm-tile-layer');
    this.parent.map.addLayer(this.layer);
  }
}
