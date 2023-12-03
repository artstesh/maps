// noinspection JSVoidFunctionReturnValueUsed

import { MapManagementService } from './map-management.service';
import { anything, capture, instance, mock, reset, verify, when } from "ts-mockito";
import { MapPostboyService } from './map-postboy.service';
import { NgZone } from "@angular/core";
import Map from "ol/Map";
import { MapStateService } from "./map-state.service";
import { Subject } from "rxjs";
import { MapRenderedEvent } from "../messages";
import { Vector as Source } from 'ol/source';
import { Vector as Layer } from 'ol/layer';
import { Forger } from "@artstesh/forger";
import { ClearLayerCommand } from "../messages/commands/clear-layer.command";
import { AddLayerCommand } from "../messages/commands/add-layer.command";
import { should } from "@artstesh/it-should";
import { RemoveLayerCommand } from "../messages/commands/remove-layer.command";

describe('MapManagementService', () => {
  const postboy = mock(MapPostboyService);
  let service: MapManagementService;
  const map = mock(Map);
  let mapRendered$ = new Subject<MapRenderedEvent>();

  beforeEach(() => {
    when(postboy.subscribe(anything())).thenReturn(new Subject()); // hide for the initial step
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    service = new MapManagementService(instance(postboy));
    mapRendered$.next(new MapRenderedEvent(instance(map)));
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("ClearLayerCommand", () => {
    const layer = mock(Layer);
    const source = mock(Source);
    let layerName: string;
    let clearEvent$ = new Subject<ClearLayerCommand>();
    let addLayerEvent$ = new Subject<AddLayerCommand>();

    beforeEach(() => {
      layerName = Forger.create<string>()!;
      when(layer.get('name')).thenReturn(layerName);
      when(postboy.subscribe(ClearLayerCommand.ID)).thenReturn(clearEvent$.asObservable());
      when(postboy.subscribe(AddLayerCommand.ID)).thenReturn(addLayerEvent$.asObservable());
      when(layer.getSource()).thenReturn(instance(source));
    });

    it("clear not existing layer ok", () => {
      const name = Forger.create<string>()!;
      //
      clearEvent$.next(new ClearLayerCommand(name));
      //
      should().true(true);
    });

    it("add without map ok", () => {
      mapRendered$.next(new MapRenderedEvent(undefined as any));
      const ev = new AddLayerCommand(instance(layer));
      //
      addLayerEvent$.next(ev);
      //
      verify(map.addLayer(anything())).never()
    });

    it("add layer success", () => {
      const ev = new AddLayerCommand(instance(layer));
      //
      addLayerEvent$.next(ev);
      //
      verify(map.addLayer(anything())).once()
    });
  });
});
