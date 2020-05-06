import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})

export class PaymentSummaryComponent implements OnInit {
  @Input() confirmed: boolean = true;
  @Input() flightDetails;

  depart: string = 'May 8'

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.depart = moment(this.flightDetails.depart).format('MMM D');
  }

  onPayment() {
    this.router.navigate(['/itinerary-confirmation']);
  }
}
