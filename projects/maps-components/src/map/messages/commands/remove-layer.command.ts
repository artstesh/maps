import BaseLayer from 'ol/layer/Base';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class RemoveLayerCommand extends PostboyGenericMessage {
  static readonly ID = '1b60599c-599a-4fdb-bad2-23b12e435e1a'

  constructor(public layer: BaseLayer) {
    super();
  }
}
