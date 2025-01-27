import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Geometry } from 'ol/geom';
import { IIdentified } from '../../models/i-identified';
import { Dictionary } from '@artstesh/collections';

/**
 * Class representing a query to get features within a specified geographical area.
 * The query optionally takes a set of layer names to ignore during the operation.
 */
export class GetFeaturesInAreaQuery extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {
  /**
   * Constructor to initialize the object with a Geometry instance and an optional set of strings to ignore.
   *
   * @param {Geometry} area - The Geometry object used to define the area.
   * @param {Set<string>} [ignore] - An optional set of layer names that will be ignored. Defaults to an empty set.
   */
  constructor(public area: Geometry, public ignore: Set<string> = new Set<string>()) {
    super();
  }
}
