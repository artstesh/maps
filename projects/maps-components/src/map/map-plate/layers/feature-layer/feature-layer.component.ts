import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import VectorSource from 'ol/source/Vector';
import { Vector as Layer } from 'ol/layer';
import { FeatureLayerSettings } from './feature-layer.settings';
import { DestructibleComponent } from '../../../common/destructible.component';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { first } from 'rxjs/operators';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';
import { FeatureLayerFactory } from './feature-layer.factory';

@Component({
  selector: 'lib-feature-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureLayerComponent extends DestructibleComponent {
  public layer: Layer<VectorSource<any>> | null = null;
  _settings: FeatureLayerSettings = new FeatureLayerSettings();

  @Input() set settings(value: FeatureLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  constructor(private postboy: MapPostboyService, private factory: FeatureLayerFactory) {
    super();
    postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(first())
      .subscribe((m) => this.initLayer());
  }

  private initLayer() {
    this.removeLayer();
    this.postboy.fire(new AddLayerCommand(this.factory.build(this._settings)));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveLayerCommand(this.layer));
  }

  onDestroy = () => this.removeLayer();
}
