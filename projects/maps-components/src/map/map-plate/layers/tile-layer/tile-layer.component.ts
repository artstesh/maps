import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { TileLayerFactory } from './tile-layer.factory';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { TileLayerSettings } from './tile-layer.settings';
import { AddTileCommand } from '../../../messages/commands/add-tile.command';
import { RemoveTileCommand } from '../../../messages/commands/remove-tile.command';

@Component({
  selector: 'art-tile-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileLayerComponent extends DestructibleComponent {
  public layer?: TileLayer<XYZ>;

  constructor(private postboy: MapPostboyService, private factory: TileLayerFactory) {
    super();
  }

  ngOnInit(): void {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe((m) => this.initLayer());
  }

  _settings: TileLayerSettings = new TileLayerSettings();

  @Input() set settings(value: TileLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  onDestroy = () => this.removeLayer();

  private initLayer() {
    this.removeLayer();
    this.layer = this.factory.build(this._settings);
    this.postboy.fire(new AddTileCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveTileCommand(this.layer));
  }
}
