import { GenericMessage } from '../generic-message';
import Map from 'ol/Map';

export class MapRenderedEvent extends GenericMessage {
  public static readonly ID = 'b6121807-3b89-4cd3-82cf-089d2cefdc4f';
  public get id(): string {
    return MapRenderedEvent.ID;
  }
  constructor(public map: Map) {
    super();
  }
}
