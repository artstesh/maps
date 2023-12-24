import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapClickEvent } from '../../../messages';
import { Subscription } from 'rxjs';
import { Vector as Layer } from 'ol/layer';
import Cluster from 'ol/source/Cluster';
import { ClusterLayerSettings } from './cluster-layer.settings';
import Style from 'ol/style/Style';

export class ClusterLayerManager {
  private subs: Subscription[] = [];
  markerStyle: { [color: string]: Style } = {};

  constructor(
    private settings: ClusterLayerSettings,
    public readonly layer: Layer<Cluster>,
    private postboy: MapPostboyService,
  ) {
    if (settings.bbox) this.observeClick();
  }

  private observeClick() {
    this.subs.push(
      this.postboy.subscribe<MapClickEvent>(MapClickEvent.ID).subscribe((m) => {
        if (m.entities[this.settings.name]?.length > 1) {
        }
      }),
    );
  }

  public destroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
