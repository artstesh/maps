import { PostboyExecutor } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import { DrawingType } from '../../models';
import Style from 'ol/style/Style';

export class GenerateDrawExecutor extends PostboyExecutor<Draw> {

  constructor(public layer: Layer<VectorSource<any>>, public style: Style, public type: DrawingType) {
    super();
  }
}
