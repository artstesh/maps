import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmTileLayerComponent } from './osm-tile-layer.component';
import {anything, instance, mock, reset, when} from "ts-mockito";
import ImageLayer from "ol/layer/Image";
import {RasterTileLayerComponent} from "../raster-tile/raster-tile-layer.component";
import {MapPostboyService} from "../../../services/map-postboy.service";
import {RasterTileLayerFactory} from "../raster-tile/raster-tile-layer.factory";
import {Subject} from "rxjs";
import {MapRenderedEvent} from "../../../messages";
import {MockBuilder, MockProvider, MockRender} from "ng-mocks";
import Map from "ol/Map";

describe('OsmTileLayerComponent', () => {
  let fixture: ComponentFixture<OsmTileLayerComponent>;

  beforeEach(async () => {
    return MockBuilder(OsmTileLayerComponent);
  });

  beforeEach(() => {
    fixture = MockRender(OsmTileLayerComponent);
  });

  afterEach(() => expect().nothing());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
