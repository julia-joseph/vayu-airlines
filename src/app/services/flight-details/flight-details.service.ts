import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {
  flightDetails: any = {
    class: "Economy",
    depart: "Thursday May 07 2020",
    from: "New York City area (NYC)",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    return: "2020-05-31",
    to: "Los Angeles, CA (LAX)",
    fromCode: "NYC",
    toCode: "LAX"
  }

  constructor() { }

  getFlightDetails() {
    return this.flightDetails;
  }

  setFlightDetails(flight: any) {
    this.flightDetails = flight;
  }

}
