import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class PlaceLayerFeaturesCommand extends PostboyGenericMessage {
  static readonly ID = '5f27a2cd-8d8a-4929-b703-8aee6dcdc21c'

  constructor(public layer: string, public features: Feature<Geometry>[]) {
    super();
  }
}
