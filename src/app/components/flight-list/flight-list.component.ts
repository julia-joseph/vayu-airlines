import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
import { OriginService } from 'src/app/services/origin/origin.service';
import { DestinationService } from 'src/app/services/destination/destination.service';

const INIT_FLIGHT_DETAILS = {
  class: "Economy",
  depart: "2020-05-08",
  from: "New York, NY (JFK)",
  passengers: {
    adults: 1,
    children: 0,
    infants: 0
  },
  return: "",
  to: "Boston, MA (BOS)",
  fromCode: "JFK",
  toCode: "BOS"
}
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  flightDetails: any = INIT_FLIGHT_DETAILS;
  dateFormat2: string[];

  constructor(
    private flightDetailsService: FlightDetailsService,
    private originService: OriginService,
    private destinationService: DestinationService
  ) { }

  ngOnInit(): void {
    this.flightDetails = this.flightDetailsService.getFlightDetails() ? this.flightDetailsService.getFlightDetails() : INIT_FLIGHT_DETAILS;
    this.dateFormat2 = this.flightDetails.depart ? this.setDates(this.flightDetails.depart) : this.setDates(moment().format('ddd - MMM D'));
  }

  setDates(date: string): string[] {
    const dates = [
      moment(date).subtract(3,'day').format('ddd - MMM D'),
      moment(date).subtract(2,'day').format('ddd - MMM D'),
      moment(date).subtract(1,'day').format('ddd - MMM D'),
      moment(date).format('ddd - MMM D'),
      moment(date).add(1,'day').format('ddd - MMM D'),
      moment(date).add(2,'day').format('ddd - MMM D'),
      moment(date).add(3,'day').format('ddd - MMM D')
    ];
    return dates; 
  }

}
