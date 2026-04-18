import { TestBed } from '@angular/core/testing';

import { ViewOrder } from './view-order';

describe('ViewOrder', () => {
  let service: ViewOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewOrder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
