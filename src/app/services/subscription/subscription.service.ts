import { Injectable } from '@angular/core';
import { MOCK_WELLNESS_SUB, MOCK_DIGITAL_SUB } from '../../consts/subscription.consts';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  wellnessKitSubscription: any[] = []; // MOCK_WELLNESS_SUB;
  digitalIfeSubscription: any[] = []; // MOCK_DIGITAL_SUB;

  adjacentSeatSubscription: any = null;

  constructor() { }

  setWellnessKitSubscription(wellnessKitSub) {
    this.wellnessKitSubscription = wellnessKitSub;
  }

  setDigitalIfeSubscription(digitalIfeSub) {
    this.digitalIfeSubscription = digitalIfeSub;
  }

  setAdjacentSeatSubscription(adjacentSub) {
    this.adjacentSeatSubscription = adjacentSub;
  }

  getWellnessKitSubscription() {
    return this.wellnessKitSubscription;
  }

  getDigitalIfeSubscription() {
    return this.digitalIfeSubscription;
  }

  getAdjacentSeatSubscription() {
    return this.adjacentSeatSubscription;
  }
}
