import { Component, OnInit } from '@angular/core';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
import { Router } from '@angular/router';
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
  totalWellnessKitPrice: number = 0;

  fromCode: string = 'YYZ';
  toCode: string = 'LGA';
  departDateFormat1: string = 'May 7 2020';
  departDateFormat2: string = 'Friday, May 7'

  totalPassengers: number = 1;
  finalPrice: number = 355.00;
  
  digitalIfe: any;
  totalDigitalIfePrice: number = 0;
  totalDigitalIfeQuantity: number = 0;

  adjacentSeat: any;
  totalAdjacentSeat: number = 0;

  constructor(
    private wellnessKitService: WellnessKitDetailsService,
    private flightDetailsService: FlightDetailsService,
    private digitalIfeService: DigitalIfeDetailsService,
    private adjacentSeatService: AdjacentSeatDetailsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.wellnessKit = this.wellnessKitService.getWellnessKitDetails();
    this.totalWellnessKitPrice = this.wellnessKitService.totalPrice;

    this.digitalIfe = this.digitalIfeService.getDigitalIfeDetails();
    this.totalDigitalIfePrice = this.digitalIfeService.totalPrice;
    this.totalDigitalIfeQuantity = this.digitalIfeService.totalQuantity;
    
    this.adjacentSeat = this.adjacentSeatService.getAdjacentSeatDetails();
    this.totalAdjacentSeat = this.adjacentSeatService.totalPrice;

    this.finalPrice = this.finalPrice + this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeat;
    
    const details = this.flightDetailsService.getFlightDetails();
    this.fromCode = details.fromCode;
    this.toCode = details.toCode;
    this.from = details.from;
    this.to = details.to;
    this.departDateFormat1 = moment(details.depart).format('MMM D YYYY');
    this.departDateFormat2 = moment(details.depart).format('dddd, MMM D');
    this.totalPassengers = details.passengers.adults + details.passengers.children + details.passengers.infants;
  }

  onDonate() {
    this.router.navigate(['/donations']);
  }
}
