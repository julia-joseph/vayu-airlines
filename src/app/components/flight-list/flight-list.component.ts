import { Component, OnInit } from '@angular/core';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
import { OriginService } from 'src/app/services/origin/origin.service';
import { DestinationService } from 'src/app/services/destination/destination.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  flightDetails: any = {
    class: "Economy",
    depart: "Thursday May 07 2020",
    from: "New York City area (NYC)",
    passengers: {
      adults: "0",
      children: "0",
      infants: "0"
    },
    return: "2020-05-31",
    to: "Los Angeles, CA (LAX)"
  }

  constructor(
    private flightDetailsService: FlightDetailsService,
    private originService: OriginService,
    private destinationService: DestinationService
  ) { }

  ngOnInit(): void {
    // this.flightDetails = this.flightDetailsService.getFlightDetails() ? this.flightDetailsService.getFlightDetails() : this.flightDetails;
    
    // this.flightDetails.from = this.originService.getOriginName(this.flightDetails.from);
    // this.flightDetails.to = this.destinationService.getDestinationName(this.flightDetails.to);
    // this.flightDetails.depart = moment(this.flightDetails.depart).format('dddd MMMM DD YYYY');

    // this.flightDetailsService.setFlightDetails(this.flightDetails);
    console.log('passengerDetails', this.flightDetails)
  }

}
