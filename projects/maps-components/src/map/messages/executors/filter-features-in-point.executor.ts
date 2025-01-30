import { PostboyExecutor } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

/**
 * A class responsible for executing filtering of geographical features
 * based on a specific geographical point (latitude and longitude).
 *
 * @template Feature - A geographical feature that is processed by the executor.
 * @template Geometry - The type of geometry associated with the feature.
 */
export class FilterFeaturesInPointExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  static readonly ID = 'dcbb156d-def3-45b4-91af-84d1483d8941';
  /**
   * Constructs a new instance with the specified latitude, longitude, and features.
   *
   * @param {number} lat - The latitude coordinate.
   * @param {number} lng - The longitude coordinate.
   * @param {Feature<Geometry>[]} features - The array of features associated with the location.
   */
  constructor(public lat: number, public lng: number, public features: Feature<Geometry>[]) {
    super();
  }
}
