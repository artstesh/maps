import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddTileCommand extends PostboyGenericMessage {

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }
}
