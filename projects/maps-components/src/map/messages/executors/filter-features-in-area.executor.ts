import { PostboyExecutor } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

/**
 * A class that extends the PostboyExecutor to filter geographical features within a specified area.
 * This class is designed to process a list of input features and determine which of them are located inside the provided area geometry.
 *
 * Parameters:
 * - `area`: A Geometry object defining the area to filter geographical features.
 * - `features`: An array of geographical features, represented as `Feature<Geometry>` objects, to be filtered by their presence within the specified area.
 */
export class FilterFeaturesInAreaExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  static readonly ID = '4d26e1e3-e60f-4e49-804b-5b3eadc2adce';
  constructor(public area: Geometry, public features: Feature<Geometry>[]) {
    super();
  }
}
