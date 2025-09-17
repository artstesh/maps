import { PostboyExecutor } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import { DrawingType } from '../../models';
import { StyleLike } from 'ol/style/Style';

export class GenerateDrawExecutor extends PostboyExecutor<Draw> {
  static readonly ID = '5d5f0737-ff70-461e-9a2e-bf6166c914cb';

  constructor(public layer: Layer<VectorSource<any>>, public style: StyleLike, public type: DrawingType) {
    super();
  }
}
