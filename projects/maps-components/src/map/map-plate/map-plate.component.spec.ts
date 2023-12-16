import { ComponentFixture } from '@angular/core/testing';

import { MapPlateComponent } from './map-plate.component';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import Map from 'ol/Map';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { ElementRef } from '@angular/core';
import { MapModule } from '../map.module';
import { MapPostboyService } from '../services/map-postboy.service';
import { MapPlateFactory } from './map-plate.factory.service';
import { MessageRegistratorService } from '../services/message-registrator.service';
import { MapManagementService } from '../services/map-management.service';

describe('MapPlateComponent', () => {
  let fixture: ComponentFixture<MapPlateComponent>;
  const postboy = mock(MapPostboyService);
  const mapFactory = mock(MapPlateFactory);
  const registrator = mock(MessageRegistratorService);
  let elementRef: ElementRef;
  const map = mock(Map);

  beforeEach(async () => {
    elementRef = new ElementRef<any>('<div></div>');
    when(mapFactory.build(anything())).thenReturn(instance(map));
    instance(map).once = (): any => []; // ToDo WTF???
    await MockBuilder(MapPlateComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)))
      .mock(MessageRegistratorService, instance(registrator))
      .provide(MockProvider(MapPlateFactory, instance(mapFactory)))
      .provide(MockProvider(ElementRef, elementRef));
  });

  beforeEach(() => {
    fixture = MockRender(MapPlateComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(map);
    reset(postboy);
    reset(registrator);
    reset(mapFactory);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('calls up', () => {
    verify(registrator.up()).once();
  });
});
