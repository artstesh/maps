import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { IIdentified } from '../../models/i-identified';
import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * Represents an event triggered by a click on a map, containing information about the
 * click's location, relevant entities, and features present at the clicked position.
 *
 * @extends {PostboyGenericMessage}
 */
export class MapClickEvent extends PostboyGenericMessage {
  static readonly ID = 'ee31a86c-e838-4531-8399-983753a354df';

  /**
   * Creates an instance of this class with the provided coordinates, entities, and features.
   *
   * @param {number[]} coordinates - An array representing the coordinates.
   * @param {{ [layer: string]: IIdentified[] }} entities - A mapping of layer names to arrays of IIdentified entities.
   * @param {{ [layer: string]: Feature<Geometry>[] }} features - A mapping of layer names to arrays of features with geometry.
   */
  constructor(
    public coordinates: number[],
    public entities: { [layer: string]: IIdentified[] },
    public features: { [layer: string]: Feature<Geometry>[] },
  ) {
    super();
  }
}
