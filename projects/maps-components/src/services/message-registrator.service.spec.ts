import { TestBed } from '@angular/core/testing';

import { MessageRegistratorService } from './message-registrator.service';

describe('MessageRegistratorService', () => {
  let service: MessageRegistratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRegistratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
