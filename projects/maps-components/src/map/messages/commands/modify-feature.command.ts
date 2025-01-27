import { PostboyCallbackMessage } from '@artstesh/postboy';
import { FeatureOutputFormat, PolygonModel } from '../../models';
import Style from 'ol/style/Style';

/**
 * Represents a command to modify a feature with a specific style and output format
 * for a polygonal model.
 *
 * @return {string | null} a string representation of the modified feature in the appropriate format
 */
export class ModifyFeatureCommand extends PostboyCallbackMessage<string | null> {

  /**
   * Constructs an instance of the class.
   *
   * @param {PolygonModel} model - The polygon model to be used.
   * @param {Style} style - The style configuration for the polygon.
   * @param {FeatureOutputFormat} [format=FeatureOutputFormat.GeoJson] - The output format of the features. Default is GeoJson.
   */
  constructor(
    public model: PolygonModel,
    public style: Style,
    public format: FeatureOutputFormat = FeatureOutputFormat.GeoJson,
  ) {
    super();
  }
}
