import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapClickEvent } from '../../../messages';
import { Vector as Layer } from 'ol/layer';
import Cluster from 'ol/source/Cluster';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { FitToFeaturesCommand } from '../../../messages/commands/fit-to-features.command';
import { MapMoveEndEvent } from '../../../messages/events/map-move-end.event';
import { auditTime } from 'rxjs/operators';

export class ClusterLayerManager {
  constructor(
    private settings: ClusterLayerSettings,
    public readonly layer: Layer<Cluster>,
    private postboy: MapPostboyService,
  ) {
    this.observeClick();
    this.observeMapMovement();
  }

  private observeMapMovement() {
    this.postboy
      .subscribe<MapMoveEndEvent>(MapMoveEndEvent.ID)
      .pipe(
        auditTime(250),
        //distinctUntilChanged((x, y) => x?.zoom <= y?.zoom ?? false),
      )
      .subscribe((m) => {
        this.checkClusterNecessity();
      });
  }

  private observeClick() {
    this.postboy.subscribe<MapClickEvent>(MapClickEvent.ID).subscribe((m) => {
      if ((m.features[this.settings.name]?.length ?? 0) > 1) {
        this.postboy.fire(new FitToFeaturesCommand(m.features[this.settings.name], -1));
      }
    });
  }

  private checkClusterNecessity(): void {
    this.layer
      .getSource()
      ?.getView()
      .then((v) => {
        console.log(v.zoom);
        const distance = (v?.zoom ?? 0) > 14 ? 0 : this.settings.distance;
        const map = this.layer?.getSource()?.setDistance(distance);
      });
  }
}
