import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { TileLayerFactory } from '../tile-layer/tile-layer.factory';
import { TileLayerSettings } from '../tile-layer/tile-layer.settings';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { AddTileCommand } from '../../../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../../../messages/commands/remove-tile.command';
import { ImageLayerFactory } from './image-layer-factory';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { ImageLayerSettings } from './image-layer.settings';
import { AddImageLayerCommand } from '../../../messages/commands/add-image-layer.command';
import { RemoveImageLayerCommand } from '../../../messages/commands/remove-image-layer.command';

@Component({
  selector: 'art-image-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLayerComponent extends DestructibleComponent implements OnInit {
  public layer?: ImageLayer<Static>;

  constructor(private postboy: MapPostboyService, private factory: ImageLayerFactory) {
    super();
  }

  _settings: ImageLayerSettings = new ImageLayerSettings();

  @Input() set settings(value: ImageLayerSettings | undefined) {
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
    this.postboy.fire(new AddImageLayerCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveImageLayerCommand(this.layer));
  }
}
