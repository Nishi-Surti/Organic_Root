import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCategory } from './admin-manage-category';

describe('AdminManageCategory', () => {
  let component: AdminManageCategory;
  let fixture: ComponentFixture<AdminManageCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
