import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WellnessKitDetailsService } from '../../services/wellness-kit-details/wellness-kit-details.service';
import { DigitalIfeDetailsService } from '../../services/digital-ife-details/digital-ife-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
  @Input() confirmed: boolean = true;

  @Input() flightDetails;

  depart: string = 'May 8';
  totalWellnessKitPrice: number = 0;
  totalWellnessKitQty: number = 0;
  totalDigitalIfePrice: number = 0;
  totalDigitalIfeQuantity: number = 0;
  totalAdjacentSeatPrice: number = 0;
  totalAdjacentSeatQuantity: number = 0;
  showPayment: boolean = false;
  finalPrice: number = 355.00;
  
  constructor(
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService,
    private digitalIfeService: DigitalIfeDetailsService,
    private adjacentSeatService: AdjacentSeatDetailsService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.depart = moment(this.flightDetails.depart).format('MMM D');

    this.wellnessKitService.priceObs.subscribe((price) => {
      this.totalWellnessKitPrice = price;
      this.finalPrice = this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeatPrice + 355;
    });

    this.wellnessKitService.kitQtyObs.subscribe((kitQty) => {
      this.totalWellnessKitQty = kitQty;
    });

    this.digitalIfeService.showPayementObservable.subscribe((state) =>{
      this.showPayment = state;
    });

    this.digitalIfeService.totalPriceObservable.subscribe(price => {
      this.totalDigitalIfePrice = price;
      this.finalPrice = this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeatPrice + 355;
    });

    this.wellnessKitService.showPayementObs.subscribe((state) => {
      this.showPayment = state;
    });


    this.digitalIfeService.totalQuantityObservable.subscribe(quantity => {
      this.totalDigitalIfeQuantity = quantity;
    });

    this.adjacentSeatService.totalPriceObservable.subscribe(price => {
      this.totalAdjacentSeatPrice = price;
      this.finalPrice = this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeatPrice + 355;
    });

    this.adjacentSeatService.totalQuantityObservable.subscribe(quantity => {
      this.totalAdjacentSeatQuantity = quantity;
    });

    this.adjacentSeatService.showPayementObservable.subscribe((state) => {
      this.showPayment = state;
    });
  }

  onPayment() {
    const subbedItemWellness = this.wellnessKitService.getWellnessKitDetails().items.filter(item => item.subscription);
    const subbedAdditionalWellness = this.wellnessKitService.getWellnessKitDetails().additionalItems.filter(item => item.subscription);
    const subbedWellness = subbedItemWellness.concat(subbedAdditionalWellness);
    const finalWellnessSubbedItems = subbedWellness.concat(this.subscriptionService.getWellnessKitSubscription());
    this.subscriptionService.setWellnessKitSubscription(finalWellnessSubbedItems);

    const subbedItemDigital = this.digitalIfeService.getDigitalIfeDetails().items.filter(item => item.subscription);
    const subbedAdditionalDigital = this.digitalIfeService.getDigitalIfeDetails().additionalItems.filter(item => item.subscription);
    const subbedDigital = subbedItemDigital.concat(subbedAdditionalDigital);
    const finalDigitalSubbedItems = subbedDigital.concat(this.subscriptionService.getDigitalIfeSubscription());
    this.subscriptionService.setDigitalIfeSubscription(finalDigitalSubbedItems);

    this.adjacentSeatService.getAdjacentSeatDetails().subscription ? 
      this.subscriptionService.setAdjacentSeatSubscription(this.adjacentSeatService.getAdjacentSeatDetails()) :
      this.subscriptionService.setAdjacentSeatSubscription([]);

    this.router.navigate(['/itinerary-confirmation']);
  }
}
