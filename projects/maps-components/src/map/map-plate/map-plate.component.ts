import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { MapLyrsLabel, MapSettings } from '../models';
import Map from 'ol/Map';
import { useGeographic } from 'ol/proj';
import { DestructibleComponent } from '../common/destructible.component';
import { MessageRegistratorService } from '../services/message-registrator.service';
import { MapPostboyService } from '../services/map-postboy.service';
import { MapRenderedEvent } from '../messages';
import { MapStateService } from '../services/map-state.service';
import { MapManagementService } from '../services/map-management.service';
import { MapPlateFactory } from './map-plate.factory.service';
import { MapClickService } from '../services/map-click.service';
import { MapFeatureService } from '../services/map-feature.service';

@Component({
  selector: 'lib-map-plate',
  templateUrl: './map-plate.component.html',
  styleUrls: ['./map-plate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageRegistratorService, MapStateService, MapManagementService, MapClickService, MapFeatureService],
})
export class MapPlateComponent extends DestructibleComponent implements OnInit {
  map!: Map;
  osmUrl = '';

  constructor(
    private elementRef: ElementRef,
    private postboy: MapPostboyService,
    private mapFactory: MapPlateFactory,
    private registrator: MessageRegistratorService,
    private detector: ChangeDetectorRef,
  ) {
    super();
    registrator.up();
  }

  _settings: MapSettings = new MapSettings();

  @Input() set settings(value: MapSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.setOsm();
  }

  ngOnInit(): void {
    useGeographic();
    this.map = this.mapFactory.build(this._settings);
    this.map.setTarget(this.elementRef.nativeElement);
    this.detector.detectChanges();
    this.map.once('postrender', () => {
      this.map.updateSize();
      this.postboy.fire(new MapRenderedEvent(this.map));
    });
    this.setOsm();
  }

  private setOsm(): void {
    if (!this.map) return;
    this.osmUrl = `https://mt{0-3}.google.com/vt/lyrs=${MapLyrsLabel.get(this._settings.lyrs)}&hl=${
      this._settings.language
    }&x={x}&y={y}&z={z}`;
    this.detector.detectChanges();
    this.map.updateSize();
  }

  onDestroy = () => {
    this.registrator.down();
  };
}
