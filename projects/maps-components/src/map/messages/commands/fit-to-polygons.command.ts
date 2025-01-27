import { PostboyGenericMessage } from '@artstesh/postboy';
import { PolygonModel } from '../../models';

/**
 * FitToPolygonsCommand is a command used to fit a given set of polygon features
 * to the viewable area, optionally applying a zoom transformation afterwards.
 */
export class FitToPolygonsCommand extends PostboyGenericMessage {

  /**
   * Creates an instance of the class with specified polygon features and an optional zoom level.
   *
   * @param {PolygonModel[]} features - An array of polygon models to fit to.
   * @param {number} [zoomAfter=0] - Optional zoom level change to apply after initialization. Defaults to 0.
   */
  constructor(public features: PolygonModel[], public zoomAfter = 0) {
    super();
  }
}
