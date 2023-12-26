import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PostboyGenericMessage } from '@artstesh/postboy';

export class PlaceLayerFeaturesCommand extends PostboyGenericMessage {
  public static readonly ID: string = '8caf86bc-869b-426f-b36d-4642f6b8aab0';

  constructor(public layer: string, public features: Feature<Geometry>[]) {
    super();
  }

  public get id(): string {
    return PlaceLayerFeaturesCommand.ID;
  }
}
