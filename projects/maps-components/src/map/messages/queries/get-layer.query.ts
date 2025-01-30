import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';

export class GetLayerQuery extends PostboyCallbackMessage<Layer<VectorSource<any> | Cluster> | null> {
  public static readonly ID = 'd2683490-2aa2-4dee-855d-f752ce4d3be5';

  constructor(public name: string) {
    super();
  }
}
