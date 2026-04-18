import { TestBed } from '@angular/core/testing';

import { CartPage } from './cart-page';

describe('CartPage', () => {
  let service: CartPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartPage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
