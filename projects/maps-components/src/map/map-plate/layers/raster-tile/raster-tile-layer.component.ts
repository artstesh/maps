import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import TileLayer from 'ol/layer/Tile';
import { Raster, XYZ } from 'ol/source';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { TileLayerFactory } from '../tile-layer/tile-layer.factory';
import { TileLayerSettings } from '../tile-layer/tile-layer.settings';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { AddTileCommand } from '../../../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../../../messages/commands/remove-tile.command';
import ImageLayer from 'ol/layer/Image';
import { RasterTileLayerFactory } from './raster-tile-layer.factory';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';
import { AddRasterTileCommand } from '../../../messages/commands/add-raster-tile-command';
import { RemoveRasterTileCommand } from '../../../messages/commands/remove-raster-tile.command';

@Component({
  selector: 'art-raster-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterTileLayerComponent extends DestructibleComponent {
  public layer?: ImageLayer<Raster>;

  constructor(private postboy: MapPostboyService, private factory: RasterTileLayerFactory) {
    super();
  }

  _settings: RasterTileLayerSettings = new RasterTileLayerSettings();

  @Input() set settings(value: RasterTileLayerSettings | undefined) {
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
    this.postboy.fire(new AddRasterTileCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveRasterTileCommand(this.layer));
  }
}
