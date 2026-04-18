import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOrderTrack } from './farmer-order-track';

describe('FarmerOrderTrack', () => {
  let component: FarmerOrderTrack;
  let fixture: ComponentFixture<FarmerOrderTrack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerOrderTrack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerOrderTrack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
