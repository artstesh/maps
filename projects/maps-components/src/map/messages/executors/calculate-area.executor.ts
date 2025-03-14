import { PostboyExecutor } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PolygonModel } from '../../models';

/**
 * An executor responsible for calculating the area of a given polygon.
 *
 * Use this class to manage and execute area-calculation logic for a polygon.
 *
 * @return {number} - the spherical area (in square meters)
 */
export class CalculateAreaExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  static readonly ID = '82347b8c-7635-45ec-85ef-75aaf43bc34c';

  constructor(public polygon: PolygonModel) {
    super();
  }
}
