import { PostboyExecutor } from '@artstesh/postboy';
import { Vector as Layer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import { DrawingType } from '../../models';
import Style from 'ol/style/Style';

export class GenerateDrawExecutor extends PostboyExecutor<Draw> {
  public static readonly ID: string = 'f01c99ba-0953-4ab5-82f9-04e6fbb678c1';

  constructor(public layer: Layer<VectorSource<any>>, public style: Style, public type: DrawingType) {
    super();
  }

  public get id(): string {
    return GenerateDrawExecutor.ID;
  }
}
