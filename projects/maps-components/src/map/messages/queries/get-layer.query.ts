import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';

export class GetLayerQuery extends PostboyCallbackMessage<Layer<VectorSource<any> | Cluster> | null> {
  public static readonly ID: string = '5c04c87b-8a93-4c2a-979e-d1e313d860ed';

  constructor(public name: string) {
    super();
  }

  public get id(): string {
    return GetLayerQuery.ID;
  }
}
