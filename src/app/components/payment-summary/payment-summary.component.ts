import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WellnessKitDetailsService } from '../../services/wellness-kit-details/wellness-kit-details.service';
@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit {
  @Input() confirmed: boolean = true;

  @Input() flightDetails;

  depart: string = 'May 8';
  totalPrice: number = 0;
  totalKitQty: number = 0;
  showPayment: boolean = false;
  finalPrice: number = 355.00;
  
  constructor(
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService
  ) {}

  ngOnInit(): void {
    this.depart = moment(this.flightDetails.depart).format('MMM D');
    this.wellnessKitService.priceObs.subscribe((price) => {
      this.totalPrice = price;
      this.finalPrice = this.totalPrice + 355;
    });
    this.wellnessKitService.kitQtyObs.subscribe((kitQty) => {
      this.totalKitQty = kitQty;
    });

    this.wellnessKitService.showPayementObs.subscribe((state) => {
      this.showPayment = state;
    });
  }

  onPayment() {
    this.router.navigate(['/itinerary-confirmation']);
  }
}
