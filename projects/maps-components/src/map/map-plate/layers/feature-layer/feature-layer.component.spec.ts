import { ComponentFixture } from '@angular/core/testing';
import Map from 'ol/Map';
import { FeatureLayerComponent } from './feature-layer.component';
import { anything, capture, instance, mock, reset, when } from 'ts-mockito';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import { FeatureLayerFactory } from './feature-layer.factory';
import { Vector as Layer } from 'ol/layer';
import { should } from '@artstesh/it-should';
import { FeatureLayerSettings } from './feature-layer.settings';
import { Forger } from '@artstesh/forger';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';

describe('FeatureLayerComponent', () => {
  const layer = mock(Layer);
  let fixture: ComponentFixture<FeatureLayerComponent>;
  const postboy = mock(MapPostboyService);
  const factory = mock(FeatureLayerFactory);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(factory.build(anything())).thenReturn(instance(layer));
    return MockBuilder(FeatureLayerComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)))
      .provide(MockProvider(FeatureLayerFactory, instance(factory)));
  });

  beforeEach(() => {
    fixture = MockRender(FeatureLayerComponent);
    mapRendered$.next(new MapRenderedEvent(instance(mock(Map))));
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(postboy);
    reset(factory);
    expect().nothing();
  });

  it('should add layer', () => {
    const [fired] = capture<AddLayerCommand>(postboy.fire).last();
    //
    should().true(fired.layer === instance(layer));
  });

  describe('replace layer', () => {
    const otherLayer = mock(Layer);
    let settings: FeatureLayerSettings;

    beforeEach(() => {
      settings = FeatureLayerSettings.copy(Forger.create<FeatureLayerSettings>()!);
      when(factory.build(settings)).thenReturn(instance(otherLayer));
      fixture.componentInstance.settings = settings;
      fixture.detectChanges();
    });

    afterEach(() => {
      reset(otherLayer);
    });

    it('should add layer', () => {
      const [fired] = capture<AddLayerCommand>(postboy.fire).last();
      //
      should().true(fired.layer === instance(otherLayer));
    });

    it('should remove old layer', () => {
      const [fired] = capture<RemoveLayerCommand>(postboy.fire).beforeLast();
      //
      should().true(fired.layer === instance(layer));
    });
  });
});
