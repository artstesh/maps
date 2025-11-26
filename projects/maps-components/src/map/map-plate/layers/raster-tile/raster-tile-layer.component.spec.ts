import { RasterTileLayerFactory } from './raster-tile-layer.factory';
import { anything, capture, instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { RasterTileLayerComponent } from './raster-tile-layer.component';
import { ComponentFixture } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { MapRenderedEvent } from '../../../messages';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { MapModule } from '../../../map.module';
import { should } from '@artstesh/it-should';
import { AddTileCommand } from '../../../messages/commands/add-tile.command';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';
import ImageLayer from 'ol/layer/Image';
import { Forger } from '@artstesh/forger';
import { RemoveTileCommand } from '../../../messages/commands/remove-tile.command';
import Map from 'ol/Map';
import { AddRasterTileCommand } from '../../../messages/commands/add-raster-tile-command';
import { RemoveRasterTileCommand } from '../../../messages/commands/remove-raster-tile.command';

describe('RasterTileLayerComponent', () => {
  const layer = mock(ImageLayer);
  let fixture: ComponentFixture<RasterTileLayerComponent>;
  const postboy = mock(MapPostboyService);
  const factory = mock(RasterTileLayerFactory);
  let mapRendered$: Subject<MapRenderedEvent>;

  beforeEach(async () => {
    mapRendered$ = new Subject<MapRenderedEvent>();
    when(postboy.sub(MapRenderedEvent)).thenReturn(mapRendered$.asObservable());
    when(factory.build(anything())).thenReturn(instance(layer));
    return MockBuilder(RasterTileLayerComponent, MapModule)
      .provide(MockProvider(MapPostboyService, instance(postboy)))
      .provide(MockProvider(RasterTileLayerFactory, instance(factory)));
  });

  beforeEach(() => {
    fixture = MockRender(RasterTileLayerComponent);
    mapRendered$.next(new MapRenderedEvent(instance(mock(Map))));
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(postboy);
    reset(factory);
    expect().nothing();
  });

  it('should add layer', () => {
    const [fired] = capture<AddRasterTileCommand>(postboy.fire).last();
    //
    should().true(fired.layer === instance(layer));
  });

  describe('replace layer', () => {
    const otherLayer = mock(ImageLayer);
    let settings: RasterTileLayerSettings;

    beforeEach(() => {
      settings = RasterTileLayerSettings.copy(Forger.create<RasterTileLayerSettings>()!);
      when(factory.build(settings)).thenReturn(instance(otherLayer));
      fixture.componentInstance.settings = settings;
      fixture.detectChanges();
    });

    afterEach(() => {
      reset(otherLayer);
    });

    it('should add layer', () => {
      const [fired] = capture<AddRasterTileCommand>(postboy.fire).last();
      //
      should().true(fired.layer === instance(otherLayer));
    });

    it('should remove old layer', () => {
      const [fired] = capture<RemoveRasterTileCommand>(postboy.fire).beforeLast();
      //
      should().true(fired.layer === instance(layer));
    });
  });
});
