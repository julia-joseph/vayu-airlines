import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListItemComponent } from './flight-list-item.component';

describe('FlightListItemComponent', () => {
  let component: FlightListItemComponent;
  let fixture: ComponentFixture<FlightListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
