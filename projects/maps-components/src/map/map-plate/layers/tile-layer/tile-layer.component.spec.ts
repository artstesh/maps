import { ComponentFixture } from '@angular/core/testing';
import Map from 'ol/Map';
import { anything, capture, instance, mock, reset, when } from 'ts-mockito';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { AddLayerCommand } from '../../../messages/commands/add-layer.command';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import { Vector as Layer } from 'ol/layer';
import { should } from '@artstesh/it-should';
import { Forger } from '@artstesh/forger';
import { RemoveLayerCommand } from '../../../messages/commands/remove-layer.command';
import { TileLayerFactory } from './tile-layer.factory';
import TileLayer from 'ol/layer/Tile';
import { AddTileCommand } from '../../../messages/commands/add-tile.command';
import { TileLayerSettings } from './tile-layer.settings';
import { TileLayerComponent } from './tile-layer.component';
import { RemoveTileCommand } from '../../../messages/commands/remove-tile.command';

describe('TileLayerComponent', () => {
  const layer = mock(TileLayer);
  let fixture: ComponentFixture<TileLayerComponent>;
  const postboy = mock(MapPostboyService);
  const factory = mock(TileLayerFactory);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(factory.build(anything())).thenReturn(instance(layer));
    return MockBuilder(TileLayerComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)))
      .provide(MockProvider(TileLayerFactory, instance(factory)));
  });

  beforeEach(() => {
    fixture = MockRender(TileLayerComponent);
    mapRendered$.next(new MapRenderedEvent(instance(mock(Map))));
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(postboy);
    reset(factory);
    expect().nothing();
  });

  it('should add layer', () => {
    const [fired] = capture<AddTileCommand>(postboy.fire).last();
    //
    should().true(fired.layer === instance(layer));
  });

  describe('replace layer', () => {
    const otherLayer = mock(TileLayer);
    let settings: TileLayerSettings;

    beforeEach(() => {
      settings = TileLayerSettings.copy(Forger.create<TileLayerSettings>()!);
      when(factory.build(settings)).thenReturn(instance(otherLayer));
      fixture.componentInstance.settings = settings;
      fixture.detectChanges();
    });

    afterEach(() => {
      reset(otherLayer);
    });

    it('should add layer', () => {
      const [fired] = capture<AddTileCommand>(postboy.fire).last();
      //
      should().true(fired.layer === instance(otherLayer));
    });

    it('should remove old layer', () => {
      const [fired] = capture<RemoveTileCommand>(postboy.fire).beforeLast();
      //
      should().true(fired.layer === instance(layer));
    });
  });
});
