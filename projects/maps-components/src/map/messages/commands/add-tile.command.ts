import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class AddTileCommand extends PostboyGenericMessage {
  static readonly ID = 'ae29b7af-21aa-4b0a-8586-92c23779e6cb';

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }
}
