import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenVegitables } from './green-vegitables';

describe('GreenVegitables', () => {
  let component: GreenVegitables;
  let fixture: ComponentFixture<GreenVegitables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenVegitables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenVegitables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
