import { PostboyExecutor } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

/**
 * The FilterFeaturesInPointExecutor class is responsible for filtering features within a given point.
 */
export class FilterFeaturesInPointExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  public static readonly ID = '5b859282-5d5a-47ca-a6ad-863a66c8b82b';
  public get id(): string {
    return FilterFeaturesInPointExecutor.ID;
  }
  constructor(public lat: number, public lng: number, public features: Feature<Geometry>[]) {
    super();
  }
}
