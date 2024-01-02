import { Injectable } from '@angular/core';
import { IPostboyDependingService } from '@artstesh/postboy';
import { MapPostboyService } from './map-postboy.service';
import { Circle, Geometry, Point } from 'ol/geom';
import Polygon from 'ol/geom/Polygon';
import { FilterFeaturesInAreaQuery } from '../messages/queries/filter-features-in-area.query';

@Injectable()
export class FeatureService implements IPostboyDependingService {
  constructor(private postboy: MapPostboyService) {}

  up(): void {
    this.postboy.subscribe<FilterFeaturesInAreaQuery>(FilterFeaturesInAreaQuery.ID).subscribe((qr) => {
      qr.finish(qr.features.filter((f) => FeatureService.booleanIntersects(qr.area, f.getGeometry()!)));
    });
  }

  private static booleanIntersects(g1: Geometry, g2: Geometry): boolean {
    if (g2.getType() === 'Point') return g1.intersectsCoordinate((g2 as Point).getCoordinates());
    if (g2.getType() === 'Circle') return g1.intersectsCoordinate((g2 as Circle).getCenter());
    if (g2.getType() === 'Polygon') return g1.intersectsCoordinate((g2 as Polygon).getInteriorPoint().getCoordinates());
    return false;
  }
}
