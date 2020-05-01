import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchFooterComponent } from './flight-search-footer.component';

describe('FlightSearchFooterComponent', () => {
  let component: FlightSearchFooterComponent;
  let fixture: ComponentFixture<FlightSearchFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
