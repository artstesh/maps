import { PostboyCallbackMessage } from '@artstesh/postboy';
import { Geometry } from 'ol/geom';
import { IIdentified } from '../../models/i-identified';
import { Dictionary } from '@artstesh/collections';

export class GetFeaturesInAreaQuery extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {
  public static readonly ID: string = 'efcf4271-a07a-40e0-9f02-d4dade40b8ac';

  constructor(public area: Geometry, public ignore: Set<string> = new Set<string>()) {
    super();
  }

  public get id(): string {
    return GetFeaturesInAreaQuery.ID;
  }
}
