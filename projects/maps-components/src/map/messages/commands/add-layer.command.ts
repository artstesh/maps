import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddLayerCommand extends PostboyGenericMessage {
  public static readonly ID: string = 'd93e250f-92bc-43ac-9c6a-46c521a1aaa5';

  constructor(public layer: Layer<VectorSource<any> | Cluster>) {
    super();
  }

  public get id(): string {
    return AddLayerCommand.ID;
  }
}
