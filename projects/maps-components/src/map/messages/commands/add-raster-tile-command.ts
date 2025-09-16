import { PostboyGenericMessage } from '@artstesh/postboy';
import ImageLayer from 'ol/layer/Image';
import { Raster } from 'ol/source';

export class AddRasterTileCommand extends PostboyGenericMessage {
  static readonly ID = 'd33447fe-eec0-4205-9b5d-0d79ddc74ad7';

  constructor(public layer: ImageLayer<Raster>) {
    super();
  }
}
