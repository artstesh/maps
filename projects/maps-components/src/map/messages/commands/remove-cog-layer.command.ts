import { PostboyGenericMessage } from '@artstesh/postboy';
import WebGLTileLayer from 'ol/layer/WebGLTile';

export class RemoveCogLayerCommand extends PostboyGenericMessage {
  static readonly ID = 'fb50bb43-64f1-4c5f-857c-40500af57e33';

  constructor(public layer: WebGLTileLayer) {
    super();
  }
}
