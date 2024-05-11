import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapClickEvent, MapRenderedEvent } from '../../../messages';
import { Vector as Layer } from 'ol/layer';
import Cluster from 'ol/source/Cluster';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { FitToFeaturesCommand } from '../../../messages/commands/fit-to-features.command';
import { MapMoveEndEvent } from '../../../messages/events/map-move-end.event';
import { auditTime } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Map } from 'ol';

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
    combineLatest([
      this.postboy.subscribe<MapMoveEndEvent>(MapMoveEndEvent.ID).pipe(auditTime(250)),
      this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID),
    ]).subscribe(([movement, renderEvent]) => {
      this.checkClusterNecessity(renderEvent.map);
    });
  }

  private observeClick() {
    this.postboy.subscribe<MapClickEvent>(MapClickEvent.ID).subscribe((m) => {
      if ((m.features[this.settings.name]?.length ?? 0) > 1) {
        this.postboy.fire(new FitToFeaturesCommand(m.features[this.settings.name], -1));
      }
    });
  }

  private checkClusterNecessity(map: Map): void {
    let zoom = map.getView().getZoom() ?? 0;
    const distance = zoom > this.settings.clusterCancel ? 0 : this.settings.distance;
    this.layer?.getSource()?.setDistance(distance);
  }
}
