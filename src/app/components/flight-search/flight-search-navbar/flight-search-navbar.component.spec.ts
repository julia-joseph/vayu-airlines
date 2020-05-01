import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchNavbarComponent } from './flight-search-navbar.component';

describe('FlightSearchNavbarComponent', () => {
  let component: FlightSearchNavbarComponent;
  let fixture: ComponentFixture<FlightSearchNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
