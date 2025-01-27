import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddLayerCommand extends PostboyGenericMessage {

  constructor(public layer: Layer<VectorSource<any> | Cluster>) {
    super();
  }
}
