import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapControl } from '../../models/map-control';

/**
 * Represents a command to remove a map control from the map.
 *
 * The command is identified by a unique static ID, and it requires a MapControl item
 * to specify the control to be removed.
 *
 * @extends PostboyGenericMessage
 */
export class RemoveControlCommand extends PostboyGenericMessage {
  /**
   * Constructs an instance of the class.
   *
   * @param {MapControl} item - The map control instance to be removed.
   */
  constructor(public item: MapControl) {
    super();
  }
}
