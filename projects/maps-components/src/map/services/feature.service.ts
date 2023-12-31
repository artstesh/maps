import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapPostboyService } from './map-postboy.service';
import { Circle, Geometry, Point } from 'ol/geom';
import Polygon from 'ol/geom/Polygon';
import { Feature } from "ol";
import { FilterFeaturesInAreaExecutor } from "../messages/executors/filter-features-in-area.executor";

export class FeatureService {
  constructor() {}

  public static filterFeaturesInArea(query: FilterFeaturesInAreaExecutor): Feature<Geometry>[] {
    return query.features.filter((f) => FeatureService.booleanIntersects(query.area, f.getGeometry()!));
  }

  private static booleanIntersects(g1: Geometry, g2: Geometry): boolean {
    if (g2.getType() === 'Point') return g1.intersectsCoordinate((g2 as Point).getCoordinates());
    if (g2.getType() === 'Circle') return g1.intersectsCoordinate((g2 as Circle).getCenter());
    if (g2.getType() === 'Polygon') return g1.intersectsCoordinate((g2 as Polygon).getInteriorPoint().getCoordinates());
    return false;
  }
}
