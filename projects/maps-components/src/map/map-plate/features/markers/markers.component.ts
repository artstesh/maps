import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MarkerModel } from '../../../models/marker-model';
import { PlaceLayerFeaturesCommand } from '../../../messages/commands/place-layer-features.command';

@Component({
  selector: 'lib-markers',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersComponent extends DestructibleComponent {
  @Input() layerName = '';
  _markers: MarkerModel[] = [];

  @Input() set markers(value: MarkerModel[]) {
    this._markers = value;
    this.putMarkers();
  }

  constructor(private postboy: MapPostboyService) {
    super();
  }

  private putMarkers(): void {
    if (!this._markers?.length) return;
    this.postboy.fire(
      new PlaceLayerFeaturesCommand(
        this.layerName,
        this._markers.map((m) => m.feature),
      ),
    );
  }
}
