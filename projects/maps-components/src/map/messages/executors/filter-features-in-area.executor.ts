import { PostboyExecutor } from "@artstesh/postboy";
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

export class FilterFeaturesInAreaExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  public static readonly ID: string = '36bb2d94-8028-4512-90dd-2386af3fc67c';

  constructor(public area: Geometry, public features: Feature<Geometry>[]) {
    super();
  }

  public get id(): string {
    return FilterFeaturesInAreaExecutor.ID;
  }
}
