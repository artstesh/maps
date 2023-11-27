import { GenericMessage } from '../generic-message';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

export class PlaceLayerFeaturesCommand extends GenericMessage {
  public static readonly ID = '8caf86bc-869b-426f-b36d-4642f6b8aab0';
  public get id(): string {
    return PlaceLayerFeaturesCommand.ID;
  }
  constructor(public layer: string, public features: Feature<Geometry>[]) {
    super();
  }
}
