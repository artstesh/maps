import { PostboyCallbackMessage } from '@artstesh/postboy';
import { DrawingType, FeatureOutputFormat } from '../../models';
import Style from 'ol/style/Style';

/**
 * Represents a command to start a drawing operation.
 */
export class StartDrawingCommand extends PostboyCallbackMessage<string | null> {
  /**
   * Constructor for creating an instance of the class that represents a drawing feature with specific type, style, and output format.
   *
   * @param {DrawingType} type - The type of the drawing to be created.
   * @param {Style} style - The style defining visual appearance of the drawing.
   * @param {FeatureOutputFormat} [format=FeatureOutputFormat.GeoJson] - The format of the feature output. Defaults to GeoJson.
   */
  constructor(
    public type: DrawingType,
    public style: Style,
    public format: FeatureOutputFormat = FeatureOutputFormat.GeoJson,
  ) {
    super();
  }
}
