import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { PolygonModel } from './polygon.model';

const geoJson = '{"type":"Feature","geometry":{"coordinates":[[[2,2],[2,-2],[-2,-2],[-2,2],[2,2]]],"type":"Polygon"}}';
const wkt = 'POLYGON ((2 2,2 -2,-2 -2,-2 2, 2 2))';

describe('#map-models PolygonModel', () => {

  afterEach(() => {
    expect().nothing();
  });

  it('GeoJson success', () => {
    const id = Forger.create<string>()!;
    const polygon = PolygonModel.fromGeoJson(id, geoJson);
    //
    should().number(polygon.lat).approximately(0, 0.001);
    should().number(polygon.lng).approximately(0, 0.001);
  });

  it('WKT success', () => {
    const id = Forger.create<string>()!;
    const polygon = PolygonModel.fromWKT(id, wkt);
    //
    should().number(polygon.lat).approximately(0, 0.001);
    should().number(polygon.lng).approximately(0, 0.001);
  });

  describe('other', () => {
    let model: PolygonModel;
    let id: string;
    let info: { prop: string };

    beforeEach(() => {
      info = Forger.create<{ prop: string }>()!;
      id = Forger.create<string>()!;
      model = PolygonModel.fromGeoJson(id, geoJson, info);
    });

    it('id is correct', () => {
      //
      should()
        .string(model.id as string)
        .equals(id);
    });

    it('info is correct', () => {
      //
      should()
        .string((model.info as { prop: string }).prop)
        .equals(info.prop);
    });

    it('feature is generated', () => {
      //
      should().true(model.feature);
    });
  });
});
