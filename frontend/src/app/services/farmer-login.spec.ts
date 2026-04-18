import { TestBed } from '@angular/core/testing';

import { FarmerLogin } from './farmer-login';

describe('FarmerLogin', () => {
  let service: FarmerLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
