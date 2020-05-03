import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewItineraryDialogComponent } from './review-itinerary-dialog.component';

describe('ReviewItineraryDialogComponent', () => {
  let component: ReviewItineraryDialogComponent;
  let fixture: ComponentFixture<ReviewItineraryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewItineraryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewItineraryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
