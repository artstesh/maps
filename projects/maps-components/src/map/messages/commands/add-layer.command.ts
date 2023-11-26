import { GenericMessage } from '../generic-message';
import BaseLayer from 'ol/layer/Base';

export class AddLayerCommand extends GenericMessage {
  public static readonly ID = 'd93e250f-92bc-43ac-9c6a-46c521a1aaa5';
  public get id(): string {
    return AddLayerCommand.ID;
  }
  constructor(public layer: BaseLayer) {
    super();
  }
}
