import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { Feature, Map, MapBrowserEvent } from 'ol';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapRendered$ = new ReplaySubject<boolean>(1);
  map?: Map;

  constructor() { }

  setMap(map: Map): void {
    this.mapRendered$.next(false);
    this.map = map;
  }
}
