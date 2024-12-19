import { PostboyCallbackMessage, PostboyExecutor } from '@artstesh/postboy';
import { Dictionary } from '@artstesh/collections';
import { IIdentified } from '../../models/i-identified';

/**
 * Represents a query to retrieve features located at a specific geographical point.
 * The query is defined by latitude, longitude, and an optional set of features to ignore.
 */
export class GetFeaturesInPointQuery extends PostboyCallbackMessage<Dictionary<IIdentified[]>> {
  public static readonly ID: string = '7c051c97-bbf1-47eb-baa3-4d1eef6f281f';

  constructor(public lat: number, public lng: number, public ignore: Set<string> = new Set<string>()) {
    super();
  }

  public get id(): string {
    return GetFeaturesInPointQuery.ID;
  }
}
