import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddLayerCommand extends PostboyGenericMessage {
  static readonly ID = '7fe68d71-350f-47e2-b1ae-62cc333e1572';

  constructor(public layer: Layer<VectorSource<any> | Cluster>) {
    super();
  }
}
