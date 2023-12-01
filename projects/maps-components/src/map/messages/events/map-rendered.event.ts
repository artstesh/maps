import { GenericMessage } from '../generic-message';
import Map from 'ol/Map';

export class MapRenderedEvent extends GenericMessage {
  public static readonly ID = 'b6121807-3b89-4cd3-82cf-089d2cefdc4f';

  constructor(public map: Map) {
    super();
  }

  public get id(): string {
    return MapRenderedEvent.ID;
  }
}
