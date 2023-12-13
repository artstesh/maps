import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { TileLayerFactory } from './tile-layer.factory';
import { TileLayerSettings } from './tile-layer.settings';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';

describe('TileLayerFactory', () => {
  let service: TileLayerFactory;
  let settings: TileLayerSettings;
  let layer: TileLayer<XYZ>;

  beforeEach(() => {
    settings = TileLayerSettings.copy(Forger.create<TileLayerSettings>()!);
    settings.projection = Forger.create<'EPSG:3857' | 'EPSG:4326'>()!;
    service = new TileLayerFactory();
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
