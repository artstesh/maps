import {ComponentFixture} from '@angular/core/testing';

import {OsmTileLayerComponent} from './osm-tile-layer.component';
import {MockBuilder, MockRender} from "ng-mocks";

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
