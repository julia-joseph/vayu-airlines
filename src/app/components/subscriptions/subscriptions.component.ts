import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  selectedTab: number = 0;
  wellnessSub: any;
  digitalSub: any;
  adjacentSub: any;

  constructor(
    private subscription: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.wellnessSub = this.subscription.getWellnessKitSubscription();
    this.digitalSub = this.subscription.getDigitalIfeSubscription();
    this.adjacentSub = this.subscription.getAdjacentSeatSubscription();
  }

  setWellness(wellnessSub) {
    this.subscription.setWellnessKitSubscription(wellnessSub);
  }

  setDigital(digitalSub) {
    this.subscription.setDigitalIfeSubscription(digitalSub);
  }

  setAdjacent(adjacentSub) {
    this.subscription.setAdjacentSeatSubscription(adjacentSub);
  }

  skipToDigitalTab() {
    this.selectedTab = 1;
  }

  skipToAdjacentTab() {
    this.selectedTab = 2;
  }
}
