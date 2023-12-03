import { MapPlateFactory } from './map-plate.factory.service';
import { MapSettings } from '../models';
import Map from 'ol/Map';
import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';

describe('MapPlateFactory', () => {
  let service: MapPlateFactory;

  beforeEach(() => {
    service = new MapPlateFactory();
  });

  afterEach(() => {
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('build', () => {
    let settings: MapSettings;
    let map: Map;

    beforeEach(() => {
      settings = MapSettings.copy(Forger.create<MapSettings>({ arrayLength: 2, numberMax: 19 })!);
      map = service.build(settings);
    });

    it('controls are empty', () => {
      should().array(map!.getControls().getArray()).empty();
    });

    it('layers are empty', () => {
      should().array(map!.getAllLayers()).empty();
    });

    it('center is correct', () => {
      should().number(map!.getView().getCenter()![0]).approximately(settings.center[0], 0.001);
      should().number(map!.getView().getCenter()![1]).approximately(settings.center[1], 0.001);
    });

    it('minZoom is correct', () => {
      should().number(map!.getView().getMinZoom()).equals(settings.minZoom);
    });

    it('maxZoom is correct', () => {
      should().number(map!.getView().getMaxZoom()).equals(settings.maxZoom);
    });
  });
});
