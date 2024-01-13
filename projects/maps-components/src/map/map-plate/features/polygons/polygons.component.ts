import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { PlaceLayerFeaturesCommand } from '../../../messages/commands/place-layer-features.command';
import { PolygonModel } from '../../../models/polygon.model';

@Component({
  selector: 'art-polygons',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonsComponent extends DestructibleComponent implements OnInit {
  @Input() layerName = '';

  constructor(private postboy: MapPostboyService) {
    super();
  }

  _polygons: PolygonModel[] = [];

  @Input() set polygons(value: PolygonModel[]) {
    this._polygons = value;
    this.putPolygons();
  }

  ngOnInit(): void {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe(() => this.putPolygons());
  }

  private putPolygons(): void {
    if (!this._polygons?.length) return;
    this.postboy.fire(
      new PlaceLayerFeaturesCommand(
        this.layerName,
        this._polygons.map((m) => m.feature),
      ),
    );
  }
}
