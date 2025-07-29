import { PostboyGenericMessage } from '@artstesh/postboy';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';

export class RemoveImageLayerCommand extends PostboyGenericMessage {
  static readonly ID = 'c8e7efdb-17ff-4cf9-89be-e688b8de3b95';

  constructor(public layer: ImageLayer<Static>) {
    super();
  }
}
