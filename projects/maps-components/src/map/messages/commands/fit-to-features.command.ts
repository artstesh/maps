import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class FitToFeaturesCommand extends PostboyGenericMessage {

  constructor(public features: Feature<Geometry>[], public zoomAfter = 0) {
    super();
  }
}
