import { TestBed } from '@angular/core/testing';

import { Adminproduct } from './admin-product';

describe('AdminProduct', () => {
  let service: Adminproduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminproduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
