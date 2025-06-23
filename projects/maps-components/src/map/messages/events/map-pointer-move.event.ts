import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents an event that is triggered when the pointer moves on a map.
 * This class extends PostboyGenericMessage.
 *
 * It contains information about the coordinates of the pointer when the event occurs.
 */
export class MapPointerMoveEvent extends PostboyGenericMessage {
  static readonly ID = '193cb41d-2489-45cc-b349-59c3ec18ed72';

  /**
   * Constructor for initializing an instance with a given point.
   *
   * @param {Array<number>} point - An array representing the coordinates of the point.
   */
  constructor(public point: Array<number>) {
    super();
  }
}
