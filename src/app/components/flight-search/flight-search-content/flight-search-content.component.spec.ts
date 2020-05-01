import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchContentComponent } from './flight-search-content.component';

describe('FlightSearchContentComponent', () => {
  let component: FlightSearchContentComponent;
  let fixture: ComponentFixture<FlightSearchContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
