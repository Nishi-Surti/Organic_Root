import { TestBed } from '@angular/core/testing';

import { ConsumerLogin } from './consumer-login';

describe('ConsumerLogin', () => {
  let service: ConsumerLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
