import { ZoomControlSettings } from './zoom-control.settings';
import { Zoom } from 'ol/control';

export class ZoomControlFactory {
  public static build(settings: ZoomControlSettings): Zoom {
    return new Zoom({
      zoomInTipLabel: settings.zoomInLabel,
      zoomOutTipLabel: settings.zoomOutLabel,
      zoomInClassName: settings.zoomInClass,
      zoomOutClassName: settings.zoomOutClass,
      className: settings.controlClass,
    });
  }
}
