import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerEarning } from './farmer-earning';

describe('FarmerEarning', () => {
  let component: FarmerEarning;
  let fixture: ComponentFixture<FarmerEarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerEarning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerEarning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
