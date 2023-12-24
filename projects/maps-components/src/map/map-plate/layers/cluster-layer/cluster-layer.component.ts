import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';
import { ClusterLayerManager } from './cluster-layer.manager';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { ClusterLayerFactory } from './cluster-layer-factory.service';

@Component({
  selector: 'lib-cluster-layer',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClusterLayerComponent extends DestructibleComponent implements OnInit {
  public manager: ClusterLayerManager | null = null;
  _settings: ClusterLayerSettings = new ClusterLayerSettings();

  constructor(private postboy: MapPostboyService, private factory: ClusterLayerFactory) {
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

  @Input() set settings(value: ClusterLayerSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.initLayer();
  }

  onDestroy = () => this.removeLayer();

  private initLayer() {
    this.removeLayer();
    this.manager = this.factory.build(this._settings, this.postboy);
    this.postboy.fire(new AddLayerCommand(this.manager.layer));
  }

  private removeLayer() {
    if (this.manager?.layer) this.postboy.fire(new RemoveLayerCommand(this.manager.layer));
  }
}
