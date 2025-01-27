import { PostboyCallbackMessage, PostboyExecutor } from "@artstesh/postboy";
import { Dictionary } from '@artstesh/collections';
import { IIdentified } from '../../models/i-identified';

/**
 * Represents a query to retrieve features located at a specific geographical point.
 * The query is defined by latitude, longitude, and an optional set of features to ignore.
*/
export class GetFeaturesInPointQuery extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {

  /**
   * Constructor for initializing a geographic coordinate object.
   *
   * @param {number} lat - The latitude of the location.
   * @param {number} lng - The longitude of the location.
   * @param {Set<string>} [ignore=new Set<string>()] - An optional set of strings to ignore during processing.
   */
  constructor(public lat: number, public lng: number, public ignore: Set<string> = new Set<string>()) {
    super();
  }
}
