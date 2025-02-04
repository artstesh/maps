import Map from 'ol/Map';
import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents an event triggered when a map rendering process is completed.
 */
export class MapRenderedEvent extends PostboyGenericMessage {
  static readonly ID = '4515dde8-1519-4e3f-a0e3-10d3c52deabe';
  /**
   * Constructor for creating an instance of the class.
   *
   * @param {Map} map - The map instance to be used by the class.
   */
  constructor(public map: Map) {
    super();
  }
}
