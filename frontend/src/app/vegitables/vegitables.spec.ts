import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vegitables } from './vegitables';

describe('Vegitables', () => {
  let component: Vegitables;
  let fixture: ComponentFixture<Vegitables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vegitables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vegitables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
