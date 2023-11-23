import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapManagementService {
  mapRendered$ = new ReplaySubject<boolean>(1);
  map?: Map;

  constructor() { }

  setMap(map: Map): void {
    this.mapRendered$.next(false);
    this.map = map;
  }

  getCurrentZoom(): number | undefined {
    return this.map?.getView().getZoom();
  }
}
