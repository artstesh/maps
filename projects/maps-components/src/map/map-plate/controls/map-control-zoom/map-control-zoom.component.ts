import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { DestructibleComponent } from '../../../common/destructible.component';
import Map from 'ol/Map';
import { ZoomControlSettings } from './zoom-control.settings';
import { MapRenderedEvent } from '../../../messages';
import { filter, first } from 'rxjs/operators';
import { Zoom } from 'ol/control';
import { GenerateZoomControlExecutor } from '../../../messages/executors/generate-zoom-control.executor';

/**
 * @class
 * @classdesc Represents a component for the Zoom control on a map.
 * @extends DestructibleComponent
 * @implements OnInit
 */
@Component({
  selector: 'art-map-control-zoom',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapControlZoomComponent extends DestructibleComponent implements OnInit {
  private map?: Map;
  private control?: Zoom;

  constructor(private postboy: MapPostboyService) {
    super();
  }

  private _settings: ZoomControlSettings = new ZoomControlSettings();

  /**
   * Sets the settings for the Zoom Control.
   *
   * @param {ZoomControlSettings | undefined} value - The new settings for the Zoom Control.
   *
   * @description
   * This method sets the settings for the Zoom Control. It takes a parameter `value` which should be an object of type `ZoomControlSettings` or `undefined`.
   *
   * If the `value` is `undefined` or the same as the current settings, the method will return without making any changes.
   *
   */
  @Input() set settings(value: ZoomControlSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.setControl();
  }

  ngOnInit(): void {
    this.postboy
      .sub(MapRenderedEvent)
      .pipe(
        filter((m) => !!m),
        first(),
      )
      .subscribe((m) => {
        this.map = m.map;
        this.setControl();
      });
  }

  onDestroy = () => {
    this.eliminate();
  };

  private setControl(): void {
    if (!this.map) return;
    this.control = this.postboy.exec(new GenerateZoomControlExecutor(this._settings));
    this.map.addControl(this.control!);
  }

  private eliminate = () => !!this.map && !!this.control && this.map.removeControl(this.control);
}
