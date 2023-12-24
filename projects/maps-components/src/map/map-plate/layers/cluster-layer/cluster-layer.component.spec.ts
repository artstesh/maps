import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterLayerComponent } from './cluster-layer.component';

describe('ClusterLayerComponent', () => {
  let component: ClusterLayerComponent;
  let fixture: ComponentFixture<ClusterLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
