import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class RemoveTileCommand extends PostboyGenericMessage {
  static readonly ID = 'dab0f861-bb25-46da-9388-717bfaae798f'

  constructor(public layer: TileLayer<XYZ>) {
    super();
  }
}
