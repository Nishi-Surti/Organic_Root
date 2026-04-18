import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerApproval } from './farmer-approval';

describe('FarmerApproval', () => {
  let component: FarmerApproval;
  let fixture: ComponentFixture<FarmerApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
