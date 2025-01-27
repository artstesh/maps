import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapControl } from '../../models/map-control';

/**
 * Represents a command to add a custom control to a map.
 */
export class AddControlCommand extends PostboyGenericMessage {
  /**
   * Creates an instance of the class with the specified MapControl object.
   *
   * @param {MapControl} item - The MapControl object to be associated with the instance.
   */
  constructor(public item: MapControl) {
    super();
  }
}
