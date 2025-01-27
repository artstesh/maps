import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapPosition } from '../../models';

/**
 * Represents an event that is triggered when the movement of a map ends.
 * This class is used to capture the final position of a map after a movement operation.
 *
 * @property {MapPosition | null} position - The final position of the map after movement ends. Can be null.
 */
export class MapMoveEndEvent extends PostboyGenericMessage {

  constructor(public position: MapPosition | null) {
    super();
  }
}
