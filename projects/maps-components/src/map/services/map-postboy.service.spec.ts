import { MapPostboyService } from './map-postboy.service';
import { Forger } from '@artstesh/forger';
import { Subject } from 'rxjs';
import { should } from '@artstesh/it-should';
import { PostboyCallbackMessage, PostboyGenericMessage } from '@artstesh/postboy';

class TestEvent extends PostboyCallbackMessage<any> {
  constructor(public value: number) {
    super();
  }
}

describe('MapPostboyService', () => {
  let service: MapPostboyService;

  beforeEach(() => {
    service = new MapPostboyService();
    service.record(TestEvent, new Subject<TestEvent>());
  });

  afterEach(() => {
    expect().nothing();
  });

  it('success', () => {
    should().true(service);
  });
});
