import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDonationComponent } from './payment-donation.component';

describe('PaymentDonationComponent', () => {
  let component: PaymentDonationComponent;
  let fixture: ComponentFixture<PaymentDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
