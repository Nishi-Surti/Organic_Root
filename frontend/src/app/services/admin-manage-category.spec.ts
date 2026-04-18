import { TestBed } from '@angular/core/testing';

import { AdminManageCategory } from './admin-manage-category';

describe('AdminManageCategory', () => {
  let service: AdminManageCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminManageCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
