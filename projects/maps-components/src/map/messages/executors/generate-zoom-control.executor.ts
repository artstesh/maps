import { PostboyExecutor } from '@artstesh/postboy';
import { Draw } from 'ol/interaction';
import { ZoomControlSettings } from '../../map-plate/controls/map-control-zoom/zoom-control.settings';

export class GenerateZoomControlExecutor extends PostboyExecutor<Draw> {
  public static readonly ID: string = 'ff16a833-c68e-4b1a-bc23-c0d16b002810';

  constructor(public settings: ZoomControlSettings) {
    super();
  }

  public get id(): string {
    return GenerateZoomControlExecutor.ID;
  }
}
