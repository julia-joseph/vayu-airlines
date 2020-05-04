import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryConfirmationComponent } from './itinerary-confirmation.component';

describe('ItineraryConfirmationComponent', () => {
  let component: ItineraryConfirmationComponent;
  let fixture: ComponentFixture<ItineraryConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
