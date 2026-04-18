import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProduct } from './my-product';

describe('MyProduct', () => {
  let component: MyProduct;
  let fixture: ComponentFixture<MyProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
