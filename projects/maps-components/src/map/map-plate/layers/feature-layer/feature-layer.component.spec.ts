import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLayerComponent } from './feature-layer.component';

describe('FeatureLayerComponent', () => {
  let component: FeatureLayerComponent;
  let fixture: ComponentFixture<FeatureLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureLayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
