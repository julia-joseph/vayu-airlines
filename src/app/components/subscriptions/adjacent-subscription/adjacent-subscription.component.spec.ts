import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjacentSubscriptionComponent } from './adjacent-subscription.component';

describe('AdjacentSubscriptionComponent', () => {
  let component: AdjacentSubscriptionComponent;
  let fixture: ComponentFixture<AdjacentSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjacentSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjacentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
