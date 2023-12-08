import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import VectorSource from 'ol/source/Vector';
import { Vector as Layer } from 'ol/layer';
import { FeatureLayerSettings } from './feature-layer.settings';
import { DestructibleComponent } from '../../../common/destructible.component';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { filter, first } from 'rxjs/operators';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';
import { FeatureLayerFactory } from './feature-layer.factory';

@Component({
  selector: 'lib-feature-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureLayerComponent extends DestructibleComponent implements OnInit {
  public layer: Layer<VectorSource<any>> | null = null;

  constructor(private postboy: MapPostboyService, private factory: FeatureLayerFactory) {
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

  _settings: FeatureLayerSettings = new FeatureLayerSettings();

  @Input() set settings(value: FeatureLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  onDestroy = () => this.removeLayer();

  private initLayer() {
    this.removeLayer();
    this.layer = this.factory.build(this._settings);
    this.postboy.fire(new AddLayerCommand(this.layer));
  }

  private removeLayer() {
    if (this.layer) this.postboy.fire(new RemoveLayerCommand(this.layer));
  }
}
