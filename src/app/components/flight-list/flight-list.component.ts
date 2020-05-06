import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
import { OriginService } from 'src/app/services/origin/origin.service';
import { DestinationService } from 'src/app/services/destination/destination.service';

const INIT_FLIGHT_DETAILS = {
  class: "Economy",
  depart: "2020-05-08",
  from: "New York City area (NYC)",
  passengers: {
    adults: "0",
    children: "0",
    infants: "0"
  },
  return: "2020-05-31",
  to: "Los Angeles, CA (LAX)"
}
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  flightDetails: any = INIT_FLIGHT_DETAILS;

  constructor(
    private flightDetailsService: FlightDetailsService,
    private originService: OriginService,
    private destinationService: DestinationService
  ) { }

  ngOnInit(): void {
    this.flightDetails = this.flightDetailsService.getFlightDetails() ? this.flightDetailsService.getFlightDetails() : INIT_FLIGHT_DETAILS;
    console.log('passengerDetails', this.flightDetails)
  }
}
