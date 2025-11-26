import { PostboyGenericMessage } from '@artstesh/postboy';
import WebGLTileLayer from 'ol/layer/WebGLTile';

export class AddCogLayerCommand extends PostboyGenericMessage {
  static readonly ID = 'cac16687-c0e8-4f00-9ead-d19260215952';

  constructor(public layer: WebGLTileLayer) {
    super();
  }
}
