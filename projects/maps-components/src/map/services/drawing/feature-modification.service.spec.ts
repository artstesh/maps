import { FeatureModificationService } from './feature-modification.service';
import { instance, mock, reset, when } from 'ts-mockito';
import { MapPostboyService } from '../map-postboy.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MapRenderedEvent } from '../../messages';
import { ModifyFeatureCommand } from '../../messages/commands/modify-feature.command';
import { CancelFeatureModificationCommand } from '../../messages/commands/cancel-feature-modification.command';

describe('FeatureModificationService', () => {
  const postboy = mock(MapPostboyService);
  let startModify$: Subject<ModifyFeatureCommand>;
  let cancelModify$: Subject<CancelFeatureModificationCommand>;
  let mapRendered$: ReplaySubject<MapRenderedEvent>;
  let service: FeatureModificationService;

  beforeEach(() => {
    mapRendered$ = new ReplaySubject<MapRenderedEvent>(1);
    startModify$ = new Subject<ModifyFeatureCommand>();
    cancelModify$ = new Subject<CancelFeatureModificationCommand>();
    when(postboy.subscribe(MapRenderedEvent.ID)).thenReturn(mapRendered$.asObservable());
    when(postboy.subscribe(ModifyFeatureCommand.ID)).thenReturn(startModify$.asObservable());
    when(postboy.subscribe(CancelFeatureModificationCommand.ID)).thenReturn(cancelModify$.asObservable());
    service = new FeatureModificationService(instance(postboy));
    service.up();
  });

  afterEach(() => {
    reset(postboy);
    expect().nothing();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
