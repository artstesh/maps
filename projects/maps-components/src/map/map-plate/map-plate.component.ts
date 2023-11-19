import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { MapSettings, MapLyrs, MapLyrsLabel } from "../models";
import { Subscription } from "rxjs";
import {Group} from "ol/layer";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { DestructibleComponent } from "../common/destructible.component";
import { TileLayerSettings } from "./layers";

@Component({
  selector: 'lib-map-plate',
  templateUrl: './map-plate.component.html',
  styleUrls: ['./map-plate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPlateComponent extends DestructibleComponent implements OnInit {
  _settings: MapSettings = new MapSettings();

  @Input() set settings(value: MapSettings | undefined) {
    if (!value || this._settings.isSame(value)) return;
    this._settings = value;
    this.setAxis();
  }

  map!: Map;
  layerGroup!: Group;
  private activeMapViewSub?: Subscription;

  constructor(
    private zone: NgZone,
    private interactManager: OlMapInteractionService,
    private elementRef: ElementRef
  ) {
    super();
  }

  private getMainLayerUrl = () =>
    `https://mt{0-3}.google.com/vt/lyrs=${MapLyrsLabel.get(this._settings.lyrs)}&hl=${this._settings.language}&x={x}&y={y}&z={z}`;

  ngOnInit(): void {
    useGeographic();
    this.zone.runOutsideAngular(() => {

      const mainLayer = new TileLayer({
        source: new OSM({
          url: this.getMainLayerUrl()
        }),
        visible: false
      });

      this.layerGroup = new Group({
        layers: [mainLayer]
      });

      this.map = new Map({
        controls: [],
        view: new View({
          center: this._settings?.center || [0, 0],
          zoom: this._settings?.zoom || 4,
          minZoom: this._settings?.minZoom || 0,
          maxZoom: this._settings?.maxZoom || 19
        }),
        layers: []
      });
    });

    this.map.setTarget(this.elementRef.nativeElement);
    this.map.getLayers().push(this.layerGroup);

    this.map.on('singleclick', e => {
      this.zone.run(() => {
        this.interactManager.setMap(this.map);
        this.interactManager.onClick(e);
      });
    });
    this.interactManager.setMap(this.map);
    this.map.once('postrender', () => {
      this.map.updateSize();
      this.interactManager.mapRendered(true);
    });
    this.activeMapViewSub = this.observeAvtiveMapView();
  }

  ngOnDestroy(): void {
    this.activeMapViewSub?.unsubscribe();
  }

  private observeLanguageChange(): Subscription {
    return this.translate.onLangChange.subscribe(language => {
      this.layerGroup.getLayersArray().forEach(layer => {
        const source = layer.getSource() as OSM;
        const newUrls = source.getUrls()?.map(url => url.replace(/hl=../, `hl=${this.currentLanguage}`));
        source.setUrls(newUrls || []);
      });
    });
  }

  private getLanguageCode(lang: string): string {
    return lang.substr(0, 2);
  }

  private observeAvtiveMapView(): Subscription {
    return this.interactManager.activeMapView.subscribe(view => {
      this.layerGroup.getLayersArray().forEach(layer => {
        layer.setVisible(layer.get('name') == view);
      });
    });
  }
}
