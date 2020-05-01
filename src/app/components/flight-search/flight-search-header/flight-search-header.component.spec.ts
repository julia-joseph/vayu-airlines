import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchHeaderComponent } from './flight-search-header.component';

describe('FlightSearchHeaderComponent', () => {
  let component: FlightSearchHeaderComponent;
  let fixture: ComponentFixture<FlightSearchHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
