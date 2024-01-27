import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapControl } from '../../models/map-control';

export class AddControlCommand extends PostboyGenericMessage {
  public static readonly ID: string = '8e1c06eb-b395-4fe1-929c-ebf0805eeb49';

  constructor(public item: MapControl) {
    super();
  }

  public get id(): string {
    return AddControlCommand.ID;
  }
}
