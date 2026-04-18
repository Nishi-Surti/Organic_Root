import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regis } from './regis';

describe('Regis', () => {
  let component: Regis;
  let fixture: ComponentFixture<Regis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
