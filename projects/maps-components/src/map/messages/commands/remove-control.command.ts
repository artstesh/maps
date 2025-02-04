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
  static readonly ID = '73bcb4f5-ce7d-4c71-b70d-e772100136a1'

  /**
   * Constructs an instance of the class.
   *
   * @param {MapControl} item - The map control instance to be removed.
   */
  constructor(public item: MapControl) {
    super();
  }
}
