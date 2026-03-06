import { PostboyExecutor } from '@artstesh/postboy';
import { ZoomControlSettings } from '../../map-plate/controls/map-control-zoom/zoom-control.settings';
import { Zoom } from 'ol/control';

export class GenerateZoomControlExecutor extends PostboyExecutor<Zoom> {
  static readonly ID = 'c59f4fc3-ccf6-4cb3-a38b-3a8c249114a2';

  constructor(public settings: ZoomControlSettings) {
    super();
  }
}
