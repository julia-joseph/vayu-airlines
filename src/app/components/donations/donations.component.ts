import { Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation/donation.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  wellnessDon: any[];
  firstDonation: boolean = true;

  isWellnessOpen: boolean = true;
  isReliefOpen: boolean = false;
  isPaymentOpen: boolean = false;

  constructor(
    private donation: DonationService
  ) { }

  ngOnInit(): void {
    this.wellnessDon = this.donation.getWellnessDonation();
    this.firstDonation = this.donation.getFirstDonation();
  }

  setWellnessDonation(donation) {
    this.donation.setFirstDonation(false);
    this.donation.setWellnessDonation(donation);
  }

  onSkipToRelief() {
    this.isWellnessOpen = false;
    this.isReliefOpen = true;
  }

  onSkipToPayment() {
    //change tab to payment
    this.isReliefOpen = false;
    this.isPaymentOpen = true;
  }
}
