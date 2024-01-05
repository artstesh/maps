import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { ZoomControlFactory } from './zoom-control.factory';
import { ZoomControlSettings } from './zoom-control.settings';
import { Zoom } from 'ol/control';

describe('ZoomControlFactory', () => {
  let settings: ZoomControlSettings;
  let zoomControl: Zoom;

  beforeEach(() => {
    settings = ZoomControlSettings.copy(Forger.create<ZoomControlSettings>()!);
    zoomControl = ZoomControlFactory.build(settings);
  });

  afterEach(() => {
    expect().nothing();
  });

  it('is alive', () => {
    //
    should().true(zoomControl);
  });
});
