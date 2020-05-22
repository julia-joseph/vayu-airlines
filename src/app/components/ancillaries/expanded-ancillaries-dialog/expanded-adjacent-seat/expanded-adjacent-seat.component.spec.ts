import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedAdjacentSeatComponent } from './expanded-adjacent-seat.component';

describe('ExpandedAdjacentSeatComponent', () => {
  let component: ExpandedAdjacentSeatComponent;
  let fixture: ComponentFixture<ExpandedAdjacentSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandedAdjacentSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedAdjacentSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
