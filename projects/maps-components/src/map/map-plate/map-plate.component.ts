import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  Input,
  NgZone,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
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
import { FeatureLayerComponent, FeatureLayerSettings, OsmTileLayerComponent } from './layers';
import { MapConstants } from '../models/map.constants';
import { DrawingService } from '../services/drawing/drawing.service';
import { DrawingGenerationService } from '../services/drawing/drawing-generation.service';
import { FeatureService } from '../services/feature.service';
import { FeatureModificationService } from '../services/drawing/feature-modification.service';
import { ControlsService } from '../services/controls/controls.service';
import { MapPointerMoveEvent } from '../messages/events/map-pointer-move.event';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'art-map-plate',
  standalone: true,
  templateUrl: './map-plate.component.html',
  styleUrls: ['./map-plate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MessageRegistratorService,
    MapStateService,
    MapManagementService,
    MapClickService,
    MapFeatureService,
    DrawingService,
    DrawingGenerationService,
    FeatureService,
    FeatureModificationService,
    ControlsService,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [OsmTileLayerComponent, FeatureLayerComponent, NgIf, NgTemplateOutlet],
})
export class MapPlateComponent extends DestructibleComponent implements AfterViewInit {
  contentRef = input.required<TemplateRef<any>>();
  private renderTryCount = 0;
  map = signal<Map | null>(null);
  osmUrl = signal<string>('');
  drawingLayerSettings = new FeatureLayerSettings().setName(MapConstants.DrawingLayerId);

  constructor(
    private elementRef: ElementRef,
    private postboy: MapPostboyService,
    private mapFactory: MapPlateFactory,
    private registrator: MessageRegistratorService,
    private detector: ChangeDetectorRef,
    private ngZone: NgZone,
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

  private initializeMap() {
    this.ngZone.runOutsideAngular(() => {
      useGeographic();
      this.map.set(this.mapFactory.build(this._settings));
      this.map()?.setTarget(this.elementRef.nativeElement);
      this.detector.detectChanges();
      this.map()?.once('postrender', () => {
        this.map()?.updateSize();
        this.postboy.fire(new MapRenderedEvent(this.map()!));
      });
      this.map()?.on('pointermove', (ev) => {
        this.postboy.fire(new MapPointerMoveEvent(ev.pixel));
      });
      this.setOsm();
    });
  }

  ngAfterViewInit() {
    const mapContainer = this.elementRef.nativeElement;

    const checkContainerSize = () => {
      const { clientWidth, clientHeight } = mapContainer;
      if (clientWidth > 0 && clientHeight > 0) {
        this.initializeMap();
      } else {
        console.error("Map's container is not rendered yet or has zero size. Trying again in 100 ms.");
        setTimeout(checkContainerSize, 20 * ++this.renderTryCount); // Проверка каждые 100 мс
      }
    };

    checkContainerSize();
  }

  onDestroy = () => {
    this.registrator.down();
  };

  private setOsm(): void {
    if (!this.map()) return;
    this.osmUrl.set(
      `https://mt{0-3}.google.com/vt/lyrs=${MapLyrsLabel.get(this._settings.lyrs)}&hl=${
        this._settings.language
      }&x={x}&y={y}&z={z}`,
    );
    this.detector.detectChanges();
    this.map()?.updateSize();
  }
}
