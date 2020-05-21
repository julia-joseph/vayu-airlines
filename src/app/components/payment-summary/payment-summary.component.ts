import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WellnessKitDetailsService } from '../../services/wellness-kit-details/wellness-kit-details.service';
import { DigitalIfeDetailsService } from '../../services/digital-ife-details/digital-ife-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
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
    private adjacentSeatService: AdjacentSeatDetailsService
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

    this.wellnessKitService.showPayementObs.subscribe((state) => {
      this.showPayment = state;
    });

    this.digitalIfeService.totalPriceObservable.subscribe(price => {
      this.totalDigitalIfePrice = price;
      this.finalPrice = this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeatPrice + 355;
    })

    this.digitalIfeService.totalQuantityObservable.subscribe(quantity => {
      this.totalDigitalIfeQuantity = quantity;
    })

    this.adjacentSeatService.totalPriceObservable.subscribe(price => {
      this.totalAdjacentSeatPrice = price;
      this.finalPrice = this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeatPrice + 355;
    })

    this.adjacentSeatService.totalQuantityObservable.subscribe(quantity => {
      this.totalAdjacentSeatQuantity = quantity;
    })
  }

  onPayment() {
    this.router.navigate(['/itinerary-confirmation']);
  }
}
