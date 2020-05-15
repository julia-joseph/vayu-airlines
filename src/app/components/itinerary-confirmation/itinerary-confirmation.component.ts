import { Component, OnInit } from '@angular/core';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
@Component({
  selector: 'app-itinerary-confirmation',
  templateUrl: './itinerary-confirmation.component.html',
  styleUrls: ['./itinerary-confirmation.component.scss']
})
export class ItineraryConfirmationComponent implements OnInit {
  confirmmationCode: string = 'UIYEGY'
  flightNumber: string = 'AC7952'
  from: string = 'Toronto';
  to: string = 'New York';
  flightDuration: string = '4 hr 55 min';

  mask: number;
  sanitizer: number;
  gloves: number;
  delivery: string;

  wellnessKit: any;
  totalPrice: number = 0;

  fromCode: string = 'YYZ';
  toCode: string = 'LGA';
  departDateFormat1: string = 'May 7 2020';
  departDateFormat2: string = 'Friday, May 7'

  totalPassengers: number = 1;
  finalPrice: number = 355.00;
  
  constructor(
    private wellnessKitService: WellnessKitDetailsService,
    private flightDetailsService: FlightDetailsService
  ) { }

  ngOnInit(): void {
    this.wellnessKit = this.wellnessKitService.getWellnessKitDetails();
    this.totalPrice = this.wellnessKitService.totalPrice;
    this.finalPrice = this.finalPrice + this.totalPrice;
    
    const details = this.flightDetailsService.getFlightDetails();
    this.fromCode = details.fromCode;
    this.toCode = details.toCode;
    this.from = details.from;
    this.to = details.to;
    this.departDateFormat1 = moment(details.depart).format('MMM D YYYY');
    this.departDateFormat2 = moment(details.depart).format('dddd, MMM D');
    this.totalPassengers = details.passengers.adults + details.passengers.children + details.passengers.infants;
  }

}
