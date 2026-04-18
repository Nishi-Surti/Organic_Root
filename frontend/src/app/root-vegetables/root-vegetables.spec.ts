import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootVegetables } from './root-vegetables';

describe('RootVegetables', () => {
  let component: RootVegetables;
  let fixture: ComponentFixture<RootVegetables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootVegetables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootVegetables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
