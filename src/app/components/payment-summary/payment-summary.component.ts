import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  confirmed: boolean = false; // must be set to true and made false after anc dialog is submitted
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onPayment() {
    this.router.navigate(['/itinerary-confirmation']);
  }
}
