import BaseLayer from 'ol/layer/Base';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class RemoveLayerCommand extends PostboyGenericMessage {
  constructor(public layer: BaseLayer) {
    super();
  }
}
