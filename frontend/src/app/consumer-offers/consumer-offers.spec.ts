import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOffers } from './consumer-offers';

describe('ConsumerOffers', () => {
  let component: ConsumerOffers;
  let fixture: ComponentFixture<ConsumerOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerOffers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
