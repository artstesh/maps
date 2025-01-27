import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';

export class GetLayerQuery extends PostboyCallbackMessage<Layer<VectorSource<any> | Cluster> | null> {
  constructor(public name: string) {
    super();
  }
}
