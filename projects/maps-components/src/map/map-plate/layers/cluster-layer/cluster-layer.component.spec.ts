import { ComponentFixture } from '@angular/core/testing';
import { anything, capture, instance, mock, reset, when } from 'ts-mockito';
import { Vector as Layer } from 'ol/layer';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import Map from 'ol/Map';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { should } from '@artstesh/it-should';
import { Forger } from '@artstesh/forger';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';
import { ClusterLayerComponent } from './cluster-layer.component';
import { ClusterLayerFactory } from './cluster-layer-factory.service';
import { ClusterLayerManager } from './cluster-layer.manager';
import { ClusterLayerSettings } from './cluster-layer.settings';

describe('ClusterLayerComponent', () => {
  const layer = mock(Layer);
  let fixture: ComponentFixture<ClusterLayerComponent>;
  const postboy = mock(MapPostboyService);
  const factory = mock(ClusterLayerFactory);
  let manager: ClusterLayerManager;
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    manager = { layer: new Layer() } as any;
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(factory.build(anything(), anything())).thenReturn(manager);
    return MockBuilder(ClusterLayerComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)))
      .provide(MockProvider(ClusterLayerFactory, instance(factory)));
  });

  beforeEach(() => {
    fixture = MockRender(ClusterLayerComponent);
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
    should().true(fired.layer === manager.layer);
  });

  describe('replace layer', () => {
    let otherManager: ClusterLayerManager;
    let settings: ClusterLayerSettings;

    beforeEach(() => {
      otherManager = { layer: new Layer() } as any;
      settings = ClusterLayerSettings.copy(Forger.create<ClusterLayerSettings>()!);
      when(factory.build(settings, anything())).thenReturn(otherManager);
      fixture.componentInstance.settings = settings;
      fixture.detectChanges();
    });

    afterEach(() => {});

    it('should add layer', () => {
      const [fired] = capture<AddLayerCommand>(postboy.fire).last();
      //
      should().true(fired.layer === otherManager.layer);
    });

    it('should remove old layer', () => {
      const [fired] = capture<RemoveLayerCommand>(postboy.fire).beforeLast();
      //
      should().true(fired.layer === manager.layer);
    });
  });
});
