import BaseLayer from 'ol/layer/Base';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class RemoveLayerCommand extends PostboyGenericMessage {
  public static readonly ID: string = 'ab484e0e-e185-45cd-8434-12101f3c7eb1';

  constructor(public layer: BaseLayer) {
    super();
  }

  public get id(): string {
    return RemoveLayerCommand.ID;
  }
}
