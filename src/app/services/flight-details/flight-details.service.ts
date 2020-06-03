import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {
  // set to true before you commit
  private firstBooking: boolean = true;
  flightDetails: any = {
    class: "Economy",
    depart: "Thursday May 07 2020",
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

  constructor() { }

  getFlightDetails() {
    return this.flightDetails;
  }

  setFlightDetails(flight: any) {
    this.flightDetails = flight;
  }

  setFirstBooking() {
    this.firstBooking = false;
  }

  isFirstBooking(): boolean {
    return this.firstBooking;
  }
}
