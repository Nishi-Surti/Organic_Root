import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOrder } from './consumer-order';

describe('ConsumerOrder', () => {
  let component: ConsumerOrder;
  let fixture: ComponentFixture<ConsumerOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
