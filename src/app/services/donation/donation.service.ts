import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  wellnessDonation = [];
  firstDonation = true;

  constructor() { }

  setWellnessDonation(wellness) {
    this.wellnessDonation = wellness;
  }

  getWellnessDonation() {
    return this.wellnessDonation;
  }

  setFirstDonation(first) {
    this.firstDonation = first
  }

  getFirstDonation() {
    return this.firstDonation;
  }
}
