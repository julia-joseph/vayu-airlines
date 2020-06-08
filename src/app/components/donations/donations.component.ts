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

  onSkipToPayment() {
    //change tab to payment
  }
}
