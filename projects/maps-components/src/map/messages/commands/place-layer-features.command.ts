import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class PlaceLayerFeaturesCommand extends PostboyGenericMessage {

  constructor(public layer: string, public features: Feature<Geometry>[]) {
    super();
  }
}
