import { GenericMessage } from '../generic-message';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';

export class AddLayerCommand extends GenericMessage {
  public static readonly ID = 'd93e250f-92bc-43ac-9c6a-46c521a1aaa5';

  constructor(public layer: Layer<VectorSource<any>>) {
    super();
  }

  public get id(): string {
    return AddLayerCommand.ID;
  }
}
