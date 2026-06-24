import { Component, Input } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import ImageLayer from 'ol/layer/Image';
import { Raster } from 'ol/source';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { GeotiffTileLayerFactory } from './geotiff-tile-layer.factory';
import { GeotiffTileLayerSettings } from './geotiff-tile-layer.settings';
import { RemoveGeotiffTileCommand } from '../../../messages/commands/remove-geotiff-tile.command';
import { AddGeotiffTileCommand } from '../../../messages/commands/add-geotiff-tile.command';
import TileLayer from 'ol/layer/WebGLTile';

@Component({
  selector: 'lib-geotiff-tile-layer',
  imports: [],
  template: '',
  styleUrls: [],
})
export class GeotiffTileLayerComponent extends DestructibleComponent {
  public layer?: TileLayer;

  constructor(private postboy: MapPostboyService, private factory: GeotiffTileLayerFactory) {
    super();
  }

  _settings: GeotiffTileLayerSettings = new GeotiffTileLayerSettings();

  @Input() set settings(value: GeotiffTileLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  ngOnInit(): void {
    this.postboy
      .sub(MapRenderedEvent)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe((m) => this.initLayer());
  }

  onDestroy = () => this.removeLayer();

  private initLayer() {
    this.removeLayer();
    this.layer = this.factory.build(this._settings);
    this.postboy.fire(new AddGeotiffTileCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveGeotiffTileCommand(this.layer));
  }
}
