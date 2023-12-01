import { GenericMessage } from '../generic-message';
import BaseLayer from 'ol/layer/Base';

export class RemoveLayerCommand extends GenericMessage {
  public static readonly ID = 'ab484e0e-e185-45cd-8434-12101f3c7eb1';

  constructor(public layer: BaseLayer) {
    super();
  }

  public get id(): string {
    return RemoveLayerCommand.ID;
  }
}
