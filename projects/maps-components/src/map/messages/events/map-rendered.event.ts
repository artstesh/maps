import Map from 'ol/Map';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class MapRenderedEvent extends PostboyGenericMessage {
  public static readonly ID: string = 'b6121807-3b89-4cd3-82cf-089d2cefdc4f';

  constructor(public map: Map) {
    super();
  }

  public get id(): string {
    return MapRenderedEvent.ID;
  }
}
