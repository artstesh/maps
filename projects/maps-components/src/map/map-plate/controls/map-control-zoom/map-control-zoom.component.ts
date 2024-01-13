import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { DestructibleComponent } from '../../../common/destructible.component';
import Map from 'ol/Map';
import { ZoomControlSettings } from './zoom-control.settings';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { Zoom } from 'ol/control';
import { GenerateZoomControlExecutor } from '../../../messages/executors/generate-zoom-control.executor';

@Component({
  selector: 'art-map-control-zoom',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapControlZoomComponent extends DestructibleComponent implements OnInit {
  private _settings: ZoomControlSettings = new ZoomControlSettings();
  private map?: Map;
  private control?: Zoom;

  @Input() set settings(value: ZoomControlSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.setControl();
  }

  constructor(private postboy: MapPostboyService) {
    super();
  }

  ngOnInit(): void {
    this.postboy
      .subscribe<MapRenderedEvent>(MapRenderedEvent.ID)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe((m) => {
        this.map = m.map;
        this.setControl();
      });
  }

  private setControl(): void {
    if (!this.map) return;
    this.control = this.postboy.execute(new GenerateZoomControlExecutor(this._settings));
    this.map.addControl(this.control!);
  }

  onDestroy = () => {
    this.eliminate();
  };

  private eliminate = () => !!this.map && !!this.control && this.map.removeControl(this.control);
}
