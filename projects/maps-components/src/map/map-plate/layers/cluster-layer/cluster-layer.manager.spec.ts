import { ClusterLayerManager } from './cluster-layer.manager';
import { anything, capture, instance, mock, reset, verify, when } from 'ts-mockito';
import { Vector as Layer } from 'ol/layer';
import { MapPostboyService } from '../../../services/map-postboy.service';
import { ClusterLayerSettings } from './cluster-layer.settings';
import { Forger } from '@artstesh/forger';
import { Subject } from 'rxjs';
import {MapClickEvent, MapRenderedEvent} from '../../../messages';
import { FitToFeaturesCommand } from '../../../messages/commands/fit-to-features.command';
import { should } from '@artstesh/it-should';
import { MapMoveEndEvent } from '../../../messages/events/map-move-end.event';

describe('ClusterLayerManager', () => {
  let service: ClusterLayerManager;
  let layer = mock(Layer);
  let postboy = mock(MapPostboyService);
  let settings: ClusterLayerSettings;
  let clickSub$: Subject<MapClickEvent>;
  let moveEndEvent$: Subject<MapMoveEndEvent>;
  let moveRenderedEvent$: Subject<MapRenderedEvent>;

  beforeEach(() => {
    clickSub$ = new Subject<MapClickEvent>();
    moveEndEvent$ = new Subject<MapMoveEndEvent>();
    moveRenderedEvent$ = new Subject<MapRenderedEvent>();
    when(postboy.subscribe(MapClickEvent.ID)).thenReturn(clickSub$);
    when(postboy.subscribe(MapMoveEndEvent.ID)).thenReturn(moveEndEvent$);
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(moveRenderedEvent$);
    settings = ClusterLayerSettings.copy(Forger.create<ClusterLayerSettings>()!);
    service = new ClusterLayerManager(settings, instance(layer), instance(postboy));
  });

  afterEach(() => {
    reset(layer);
    reset(postboy);
    expect().nothing();
  });

  [0, 1].forEach((count) => {
    it(`should not fit to ${count}`, () => {
      const features = Forger.create<number[]>({ arrayLength: count })! as any;
      clickSub$.next(new MapClickEvent([], {}, { [settings.name]: features }));
      //
      verify(postboy.fire(anything())).never();
    });
  });

  it(`should not fit to other layer`, () => {
    const otherName = Forger.create<string>()!;
    const features = Forger.create<number[]>({ arrayLength: 2 })! as any;
    //
    clickSub$.next(new MapClickEvent([], {}, { [otherName]: features }));
    //
    verify(postboy.fire(anything())).never();
  });

  it(`should fit to features`, () => {
    const features = Forger.create<number[]>({ arrayLength: 2 })! as any;
    //
    clickSub$.next(new MapClickEvent([], {}, { [settings.name]: features }));
    //
    const [ev] = capture<FitToFeaturesCommand>(postboy.fire).last();
    verify(postboy.fire(anything())).once();
    should().true(ev.features === features);
  });
});
