import { PostboyExecutor } from '@artstesh/postboy';
import { Geometry } from 'ol/geom';
import { getLength } from 'ol/sphere';

export class GetGeometryLengthExecutor extends PostboyExecutor<number> {
  static readonly ID = '763146df-6d93-4dc2-a532-0e9ba2b2d023';

  constructor(public geometry: Geometry, public projection = 'EPSG:4326') {
    super();
  }
}

export class GetGeometryLengthExecutorHandler {
  public handle(executor: GetGeometryLengthExecutor): number {
    return Math.round(getLength(executor.geometry, { projection: executor.projection }) * 100) / 100;
  }
}
