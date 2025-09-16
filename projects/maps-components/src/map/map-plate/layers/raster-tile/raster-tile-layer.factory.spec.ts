import { Raster } from 'ol/source';
import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { RasterTileLayerFactory } from './raster-tile-layer.factory';
import { RasterTileLayerSettings } from './raster-tile-layer.settings';
import ImageLayer from 'ol/layer/Image';

describe('RasterTileLayerFactory', () => {
  let service: RasterTileLayerFactory;
  let settings: RasterTileLayerSettings;
  let layer: ImageLayer<Raster>;

  beforeEach(() => {
    settings = RasterTileLayerSettings.copy(Forger.create<RasterTileLayerSettings>()!);
    settings.projection = Forger.create<'EPSG:3857' | 'EPSG:4326'>()!;
    service = new RasterTileLayerFactory();
    layer = service.build(settings);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('should build', () => {
    //
    should().true(layer);
  });
});
