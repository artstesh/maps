import { PostboyGenericMessage } from '@artstesh/postboy';
import { MapControl } from '../../models/map-control';

export class RemoveControlCommand extends PostboyGenericMessage {
  public static readonly ID: string = '361641e0-804a-4930-8c27-0cea6330dbfc';

  constructor(public item: MapControl) {
    super();
  }

  public get id(): string {
    return RemoveControlCommand.ID;
  }
}
