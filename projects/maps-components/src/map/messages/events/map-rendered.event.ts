import Map from 'ol/Map';
import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents an event triggered when a map rendering process is completed.
 */
export class MapRenderedEvent extends PostboyGenericMessage {
  /**
   * Constructor for creating an instance of the class.
   *
   * @param {Map} map - The map instance to be used by the class.
   */
  constructor(public map: Map) {
    super();
  }
}
