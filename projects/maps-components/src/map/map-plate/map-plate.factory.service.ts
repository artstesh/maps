import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import { MapSettings } from '../models';
import View from 'ol/View';

@Injectable({
  providedIn: 'root',
})
export class MapPlateFactory {
  public build(settings: MapSettings): Map {
    return new Map({
      controls: [],
      view: new View({
        center: settings?.center || [0, 0],
        zoom: settings?.zoom || 4,
        minZoom: settings?.minZoom || 0,
        maxZoom: settings?.maxZoom || 19,
      }),
      layers: [],
    });
  }
}
