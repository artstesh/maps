import { PostboyExecutor } from '@artstesh/postboy';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { PolygonModel } from '../../models';

export class CalculateAreaExecutor extends PostboyExecutor<Feature<Geometry>[]> {
  public static readonly ID: string = '172ecf46-86b5-4f46-a5f1-96ba2cbb1694';

  constructor(public polygon: PolygonModel) {
    super();
  }

  public get id(): string {
    return CalculateAreaExecutor.ID;
  }
}
