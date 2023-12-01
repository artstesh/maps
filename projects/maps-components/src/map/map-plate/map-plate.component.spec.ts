import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlateComponent } from './map-plate.component';

describe('MapPlateComponent', () => {
  let component: MapPlateComponent;
  let fixture: ComponentFixture<MapPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapPlateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
