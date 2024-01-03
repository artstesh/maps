import { FeatureService } from './feature.service';
import { PolygonModel } from '../models';
import { Feature } from 'ol';
import { Circle, Geometry, Point } from 'ol/geom';
import { should } from '@artstesh/it-should';
import { FilterFeaturesInAreaExecutor } from '../messages/executors/filter-features-in-area.executor';

describe('FeatureService', () => {
  let service: FeatureService;
  let query: FilterFeaturesInAreaExecutor;
  const area = PolygonModel.fromWKT(1, 'POLYGON ((19 22, 19 27, 25 27, 25 22, 19 22))');

  beforeEach(() => {
    query = new FilterFeaturesInAreaExecutor(area.feature.getGeometry()!, []);
    service = new FeatureService();
  });

  afterEach(() => {
    expect().nothing();
  });

  describe('FilterFeaturesInAreaQuery', () => {
    it('empty array, do nothing', () => {
      query.features = [];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).empty();
    });

    it('point no intersection', () => {
      query.features = [new Feature<Geometry>(new Point([10, 10]))];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).empty();
    });

    it('circle no intersection', () => {
      query.features = [new Feature<Geometry>(new Circle([10, 10], 10))];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).empty();
    });

    it('polygon no intersection', () => {
      query.features = [PolygonModel.fromWKT(1, 'POLYGON ((15 20, 15 23, 19 23, 19 20, 15 20))').feature];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).empty();
    });

    it('point with intersection', () => {
      query.features = [new Feature<Geometry>(new Point([20, 25]))];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).length(1);
      should().true(FeatureService.filterFeaturesInArea(query)[0] === query.features[0]);
    });

    it('circle with intersection', () => {
      query.features = [new Feature<Geometry>(new Circle([20, 25], 10))];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).length(1);
      should().true(FeatureService.filterFeaturesInArea(query)[0] === query.features[0]);
    });

    it('polygon no intersection', () => {
      query.features = [PolygonModel.fromWKT(1, 'POLYGON ((20 21, 20 24, 23 24, 23 21, 20 21))').feature];
      //
      should().array(FeatureService.filterFeaturesInArea(query)).length(1);
      should().true(FeatureService.filterFeaturesInArea(query)[0] === query.features[0]);
    });
  });
});
