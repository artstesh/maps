import { TestBed } from '@angular/core/testing';

import { FeatureService } from './feature.service';
import { anything, instance, mock, reset, when } from "ts-mockito";
import { MapPostboyService } from "./map-postboy.service";
import Map from "ol/Map";
import { ReplaySubject, Subject } from "rxjs";
import { MapRenderedEvent } from "../messages";
import { MapClickService } from "./map-click.service";
import { FilterFeaturesInAreaQuery } from "../messages/queries/filter-features-in-area.query";
import { PolygonModel } from "../models";
import { Feature } from "ol";
import { Circle, Geometry, Point } from "ol/geom";
import { should } from "@artstesh/it-should";

describe('FeatureService', () => {
  const postboy = mock(MapPostboyService);
  let featuresInArea$: ReplaySubject<FilterFeaturesInAreaQuery>;
  let service: FeatureService;
  let query: FilterFeaturesInAreaQuery;
  const area = PolygonModel.fromWKT(1, 'POLYGON ((19 22, 19 27, 25 27, 25 22, 19 22))');

  beforeEach(() => {
    query = new FilterFeaturesInAreaQuery(area.feature.getGeometry()!, []);
    featuresInArea$ = new ReplaySubject<FilterFeaturesInAreaQuery>(1);
    when(postboy.subscribe(FilterFeaturesInAreaQuery.ID)).thenReturn(featuresInArea$.asObservable());
    service = new FeatureService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  describe('FilterFeaturesInAreaQuery', () => {
    it('empty array, do nothing', () => {
      query.features = [];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).empty();
    })

    it('point no intersection', () => {
      query.features = [new Feature<Geometry>(new Point([10,10]))];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).empty();
    })

    it('circle no intersection', () => {
      query.features = [new Feature<Geometry>(new Circle([10,10], 10))];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).empty();
    })

    it('polygon no intersection', () => {
      query.features = [PolygonModel.fromWKT(1, 'POLYGON ((15 20, 15 23, 19 23, 19 20, 15 20))').feature];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).empty();
    })

    it('point with intersection', () => {
      query.features = [new Feature<Geometry>(new Point([20,25]))];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).length(1)
      should().true(result[0] === query.features[0]);
    })

    it('circle with intersection', () => {
      query.features = [new Feature<Geometry>(new Circle([20,25], 10))];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).length(1)
      should().true(result[0] === query.features[0]);
    })

    it('polygon no intersection', () => {
      query.features = [PolygonModel.fromWKT(1, 'POLYGON ((20 21, 20 24, 23 24, 23 21, 20 21))').feature];
      let result: Feature<Geometry>[] = [];
      //
      query.result.subscribe(f => result = f);
      featuresInArea$.next(query);
      //
      should().array(result).length(1)
      should().true(result[0] === query.features[0]);
    })
  })
});
