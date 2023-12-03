import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { MapLyrs } from './map-lyrs.enum';
import { MarkerModel } from "./marker-model";
import { Point } from "ol/geom";

describe('#map-models MarkerModel', () => {
  let model: MarkerModel;
  let lat: number;
  let lng: number;

  beforeEach(() => {
    [lat, lng] = Forger.create<[number, number]>()!;
    model = new MarkerModel(lat, lng);
  });

  afterEach(() => {
    expect().nothing();
  });

  describe('creation', () => {

    it('lat is correct', () => {
      //
      should().number(model.lat).equals(lat);
    });

    it('lng is correct', () => {
      //
      should().number(model.lng).equals(lng);
    });

    it('id is generated', () => {
      //
      should().string(model.id as string).not.empty();
    });

    it('id is correct', () => {
      const expected = Forger.create<string>()!;
      const unit = new MarkerModel(model.lat, model.lng, expected);
      //
      should().string(unit.id as string).equals(expected);
    });
  });

  describe('feature()', () => {

    it('feature is defined', () => {
      //
      should().true(model.feature);
    });

    it('id is correct', () => {
      //
      should().string(model.feature.getId() as string).equals(model.id as string);
    });

    it('coordinates are correct', () => {
      const coordinates = (model.feature.getGeometry()! as Point).getCoordinates();
      //
      should().number(coordinates[0]).equals(model.lng);
      should().number(coordinates[1]).equals(model.lat);
    });

    it('info is correct', () => {
      const expected = Forger.create<{f1: number, f2: string}>()!;
      const unit = new MarkerModel(model.lat, model.lng, model.id, expected);
      //
      should().number(unit.feature.get('f1')).equals(expected.f1);
      should().string(unit.feature.get('f2')).equals(expected.f2);
    });
  });
});
