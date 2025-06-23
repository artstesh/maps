import { PostboyGenericMessage } from '@artstesh/postboy';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';

/**
 * Represents an event triggered when a map feature is hovered over.
 * This event contains information about the hovered feature and its associated layer.
 * Extends the PostboyGenericMessage class.
 */
export class MapFeatureHoveredEvent extends PostboyGenericMessage {
  static readonly ID = 'eb9b032a-1616-4823-a628-0fd8ffc3b57a';

  /**
   * Constructs an instance of the class.
   *
   * @param {Feature|null} feature - The feature associated with this instance. Can be null.
   * @param {string|null} layer - The layer associated with this instance. Can be null.
   */
  constructor(public feature: Feature|null, public layer: string|null) {
    super();
  }
}
