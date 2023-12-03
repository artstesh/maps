import { MapPostboyService } from './map-postboy.service';
import { GenericMessage } from '../messages';
import { Forger } from '@artstesh/forger';
import { Subject } from 'rxjs';
import { should } from '@artstesh/it-should';

class TestEvent extends GenericMessage {
  public static readonly ID = Forger.create<string>()!;
  id: string = TestEvent.ID;

  constructor(public value: number) {
    super();
  }
}

describe('MapPostboyService', () => {
  let service: MapPostboyService;

  beforeEach(() => {
    service = new MapPostboyService();
    service.register(TestEvent.ID, new Subject<TestEvent>());
  });

  afterEach(() => {
    expect().nothing();
  });

  it('success', () => {
    let testEvent = new TestEvent(Forger.create<number>()!);
    let gotValue: number;
    service.subscribe<TestEvent>(TestEvent.ID).subscribe((e) => (gotValue = e.value));
    //
    service.fire(testEvent);
    //
    should().number(gotValue!).equals(testEvent.value);
  });
});
