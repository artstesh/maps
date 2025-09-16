import { PostboyGenericMessage } from '@artstesh/postboy';
import ImageLayer from 'ol/layer/Image';
import { Raster } from 'ol/source';

export class RemoveRasterTileCommand extends PostboyGenericMessage {
  static readonly ID = 'd1c4bf6a-e2f2-4385-a7a2-cecb525f8939';

  constructor(public layer: ImageLayer<Raster>) {
    super();
  }
}
