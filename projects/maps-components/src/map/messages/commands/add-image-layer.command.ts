import { PostboyGenericMessage } from '@artstesh/postboy';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';

export class AddImageLayerCommand extends PostboyGenericMessage {
  static readonly ID = '70f9b86f-8bc2-4f28-ae79-a13fc0b1ee5d';

  constructor(public layer: ImageLayer<Static>) {
    super();
  }
}
