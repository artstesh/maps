import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class FitToFeaturesCommand extends PostboyGenericMessage {
  public static readonly ID: string = '76cdc091-3793-4b6c-82f7-1e0334cf08a8';

  constructor(public features: Feature<Geometry>[], public zoomAfter = 0) {
    super();
  }

  public get id(): string {
    return FitToFeaturesCommand.ID;
  }
}
