import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { MapLyrsLabel, MapSettings } from '../models';
import { Subscription } from 'rxjs';
import Map from 'ol/Map';
import View from 'ol/View';
import { useGeographic } from 'ol/proj';
import { DestructibleComponent } from '../common/destructible.component';
import { MessageRegistratorService } from '../../services/message-registrator.service';
import { MapPostboyService } from "../../services/map-postboy.service";
import { MapRenderedEvent } from "../../messages/events/map-rendered.event";

@Component({
  selector: 'lib-map-plate',
  templateUrl: './map-plate.component.html',
  styleUrls: ['./map-plate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageRegistratorService],
})
export class MapPlateComponent extends DestructibleComponent implements OnInit {
  _settings: MapSettings = new MapSettings();
  osmUrl = '';

  @Input() set settings(value: MapSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.setOsm();
  }

  map!: Map;
  private activeMapViewSub?: Subscription;

  constructor(private zone: NgZone, private elementRef: ElementRef,
              private postboy: MapPostboyService,
              private detector: ChangeDetectorRef) {
    super();
  }

  private setOsm(): void {
    this.osmUrl = `https://mt{0-3}.google.com/vt/lyrs=${MapLyrsLabel.get(this._settings.lyrs)}&hl=${
      this._settings.language
    }&x={x}&y={y}&z={z}`;
    this.detector.detectChanges();
  }

  ngOnInit(): void {
    useGeographic();
    this.zone.runOutsideAngular(() => {
      this.map = new Map({
        controls: [],
        view: new View({
          center: this._settings?.center || [0, 0],
          zoom: this._settings?.zoom || 4,
          minZoom: this._settings?.minZoom || 0,
          maxZoom: this._settings?.maxZoom || 19,
        }),
        layers: [],
      });
    });

    this.map.setTarget(this.elementRef.nativeElement);

    this.map.on('singleclick', (e) => {
      this.zone.run(() => this.service.onClick(e));
    });
    this.map.once('postrender', () => {
      this.map.updateSize();
      this.postboy.fire(new MapRenderedEvent(this.map));
    });
  }

  ngOnDestroy(): void {
    this.activeMapViewSub?.unsubscribe();
  }
}
