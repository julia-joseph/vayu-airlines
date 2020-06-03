import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  wellnessKitSubscription: any[];
  digitalIfeSubscription: any[];
  adjacentSeatSubscription: any[];

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
