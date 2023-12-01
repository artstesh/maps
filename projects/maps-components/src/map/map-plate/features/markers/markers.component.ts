import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { DestructibleComponent } from '../../../common/destructible.component';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { MarkerModel } from '../../../models/marker-model';
import { PlaceLayerFeaturesCommand } from '../../../messages/commands/place-layer-features.command';
import { MapRenderedEvent } from "../../../messages";
import { filter, first } from "rxjs/operators";

@Component({
  selector: 'lib-markers',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersComponent extends DestructibleComponent implements OnInit{
  @Input() layerName = '';

  constructor(private postboy: MapPostboyService) {
    super();
  }

  _markers: MarkerModel[] = [];

  @Input() set markers(value: MarkerModel[]) {
    this._markers = value;
    this.putMarkers();
  }



  private putMarkers(): void {
    if (!this._markers?.length) return;
    console.log(this._markers);
    this.postboy.fire(
      new PlaceLayerFeaturesCommand(
        this.layerName,
        this._markers.map((m) => m.feature),
      ),
    );
  }

  ngOnInit(): void {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(filter(m => !!m),first())
      .subscribe(() => this.putMarkers());
  }
}
