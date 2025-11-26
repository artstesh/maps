import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { CogLayerSettings } from './cog-layer.settings';
import { CogLayerFactory } from './cog-layer.factory';
import { AddCogLayerCommand } from '../../../messages/commands/add-cog-layer.command';
import { RemoveCogLayerCommand } from '../../../messages/commands/remove-cog-layer.command';
import WebGLTileLayer from 'ol/layer/WebGLTile';

@Component({
  selector: 'art-cog-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CogLayerComponent extends DestructibleComponent {
  public layer?: WebGLTileLayer;

  constructor(private postboy: MapPostboyService, private factory: CogLayerFactory) {
    super();
  }

  _settings: CogLayerSettings = new CogLayerSettings();

  @Input() set settings(value: CogLayerSettings | undefined) {
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
    this.postboy.fire(new AddCogLayerCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveCogLayerCommand(this.layer));
  }
}
