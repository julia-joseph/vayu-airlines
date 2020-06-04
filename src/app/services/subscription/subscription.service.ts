import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  wellnessKitSubscription: any[] = [
    {
      item: "Mask",
      pone: true,
      price: 5.24,
      ptwo: true,
      quantity: 2,
      self: false,
      size: "Adult/M",
      subscription: true
    },
    {
      item: "Boxed Meal",
      pone: false,
      price: 20,
      ptwo: false,
      quantity: 1,
      self: true,
      size: "Adult/Muffin",
      subscription: true
    }
  ]
  digitalIfeSubscription: any[] = [
    {
      packageType: "Basic",
      pone: true,
      price: 0.00,
      ptwo: true,
      screens: 2,
      self: false,
      subscription: true
    },
    {
      packageType: "Premium",
      pone: false,
      price: 1.50,
      ptwo: false,
      screens: 2,
      self: true,
      subscription: true
    }
  ]
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
