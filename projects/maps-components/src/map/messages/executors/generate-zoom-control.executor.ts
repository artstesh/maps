import { PostboyExecutor } from '@artstesh/postboy';
import { Draw } from 'ol/interaction';
import { ZoomControlSettings } from '../../map-plate/controls/map-control-zoom/zoom-control.settings';

export class GenerateZoomControlExecutor extends PostboyExecutor<Draw> {
  constructor(public settings: ZoomControlSettings) {
    super();
  }
}
