import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { Feature, Map, MapBrowserEvent } from 'ol';
import { MapPostboyService } from './map-postboy.service';
import { MapRenderedEvent } from '../messages';
import { MapClickEvent } from '../messages/events/map-click.event';
import { Geometry } from 'ol/geom';

@Injectable()
export class MapClickService implements IPostboyDependingService {
  private map?: Map;

  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.observeMapRender();
  }

  private observeMapRender() {
    this.postboy.subscribe<MapRenderedEvent>(MapRenderedEvent.ID).subscribe((m) => {
      this.map = m.map;
      console.log(m.map);
      this.map?.on('singleclick', (e) => {
        this.postboy.fire(this.onClick(e));
      });
    });
  }

  onClick(ev: MapBrowserEvent<UIEvent>): MapClickEvent {
    const model: MapClickEvent = new MapClickEvent(ev.coordinate, {});
    this.map?.forEachFeatureAtPixel(ev.pixel, (f, l) => {
      this.getFeatureCollectionWithInner([f as Feature<Geometry>]).filter((f) => !!f.getId())
        .forEach((fs: Feature<Geometry>) => {
          let layerName = l.get('name');
          if (!model.entities[layerName]) model.entities[layerName] = [];
          model.entities[layerName].push(f.getId()!);
        });
    });
    return model;
  }

  private getFeatureCollectionWithInner(features: Feature<Geometry>[]): Feature<Geometry>[] {
    const result: Feature<Geometry>[] = [];
    features?.forEach((f) => {
      const innerFeatures = f.get('features') as Feature<Geometry>[];
      innerFeatures?.length ? result.push(...innerFeatures) : result.push(f);
    });
    return result;
  }
}
