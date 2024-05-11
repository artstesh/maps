import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MarkerModel } from '../../../models/marker-model';
import { PlaceLayerFeaturesCommand } from '../../../messages/commands/place-layer-features.command';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';

/**
 * MarkersComponent is a component that displays markers on a map.
 * It listens for changes in the `markers` input property and
 * automatically puts the markers on the map using the MapPostboyService.
 */
@Component({
  selector: 'art-markers',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersComponent extends DestructibleComponent implements OnInit {
  @Input() layerName = '';

  constructor(private postboy: MapPostboyService) {
    super();
  }

  _markers: MarkerModel[] = [];

  /**
   * Sets the markers property.
   *
   * @param {MarkerModel[]} value - The array of MarkerModel objects to set as markers.
   */
  @Input() set markers(value: MarkerModel[]) {
    this._markers = value ?? [];
    this.putMarkers();
  }

  ngOnInit(): void {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe(() => this.putMarkers());
  }

  private putMarkers(): void {
    if (!this._markers) return;
    this.postboy.fire(
      new PlaceLayerFeaturesCommand(
        this.layerName,
        this._markers.map((m) => m.feature),
      ),
    );
  }
}
