import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjacentSeatComponent } from './adjacent-seat.component';

describe('AdjacentSeatComponent', () => {
  let component: AdjacentSeatComponent;
  let fixture: ComponentFixture<AdjacentSeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjacentSeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjacentSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
