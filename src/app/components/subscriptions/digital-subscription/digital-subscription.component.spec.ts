import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalSubscriptionComponent } from './digital-subscription.component';

describe('DigitalSubscriptionComponent', () => {
  let component: DigitalSubscriptionComponent;
  let fixture: ComponentFixture<DigitalSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
