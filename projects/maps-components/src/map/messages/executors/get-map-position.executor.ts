import { PostboyExecutor } from '@artstesh/postboy';
import { MapPosition } from '../../models';

/**
 * A message that allows to get the current state of the map.
 * If the map's state is not defined yet, the executor would return null
 * @returns {MapPosition | null}
 */
export class GetMapPositionExecutor extends PostboyExecutor<MapPosition | null> {
  public static readonly ID = '52c95689-d09b-4082-ba58-9183ea96a213';

  public get id(): string {
    return GetMapPositionExecutor.ID;
  }

  constructor() {
    super();
  }
}
