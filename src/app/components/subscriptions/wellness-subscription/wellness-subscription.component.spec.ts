import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessSubscriptionComponent } from './wellness-subscription.component';

describe('WellnessSubscriptionComponent', () => {
  let component: WellnessSubscriptionComponent;
  let fixture: ComponentFixture<WellnessSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnessSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
