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
    console.log('wellnessSub',this.wellnessKitSubscription);
  }

  setDigitalIfeSubscription(digitalIfeSub) {
    this.digitalIfeSubscription = digitalIfeSub;
    console.log('digitalSub',this.digitalIfeSubscription);
  }

  setAdjacentSeatSubscription(adjacentSub) {
    this.adjacentSeatSubscription = adjacentSub;
    console.log('adjacentSub',this.adjacentSeatSubscription);
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
