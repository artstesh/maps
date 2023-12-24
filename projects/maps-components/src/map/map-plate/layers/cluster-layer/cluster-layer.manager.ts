import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapClickEvent } from '../../../messages';
import { Vector as Layer } from 'ol/layer';
import Cluster from 'ol/source/Cluster';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { FitToFeaturesCommand } from '../../../messages/commands/fit-to-features.command';

export class ClusterLayerManager {
  constructor(
    private settings: ClusterLayerSettings,
    public readonly layer: Layer<Cluster>,
    private postboy: MapPostboyService,
  ) {
    this.observeClick();
  }

  private observeClick() {
    this.postboy.subscribe<MapClickEvent>(MapClickEvent.ID).subscribe((m) => {
      if ((m.features[this.settings.name]?.length ?? 0) > 1) {
        this.postboy.fire(new FitToFeaturesCommand(m.features[this.settings.name], -1));
      }
    });
  }
}
