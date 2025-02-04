import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class FitToFeaturesCommand extends PostboyGenericMessage {
  static readonly ID = '04d67609-0b4c-4f52-aa53-ad0a3db967dc'

  constructor(public features: Feature<Geometry>[], public zoomAfter = 0) {
    super();
  }
}
