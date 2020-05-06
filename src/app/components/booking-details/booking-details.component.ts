import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  confirmed: boolean = true;
  flightDetails: any = {};
  constructor(
    private flightDetailsService: FlightDetailsService
  ) { }

  ngOnInit(): void {
    this.flightDetails = this.flightDetailsService.getFlightDetails();
  }

  onSubmitOfAncillaries() {
    this.confirmed = false;
  }

}
