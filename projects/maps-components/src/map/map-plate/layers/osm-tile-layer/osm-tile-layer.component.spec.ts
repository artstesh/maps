import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmTileLayerComponent } from './osm-tile-layer.component';

describe('OsmTileLayerComponent', () => {
  let component: OsmTileLayerComponent;
  let fixture: ComponentFixture<OsmTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsmTileLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
