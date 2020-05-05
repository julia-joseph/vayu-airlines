import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itinerary-confirmation',
  templateUrl: './itinerary-confirmation.component.html',
  styleUrls: ['./itinerary-confirmation.component.scss']
})
export class ItineraryConfirmationComponent implements OnInit {
  confirmmationCode: string = 'UIYEGY'
  flightNumber: string = 'AC7952'
  departureDate: string ='Fri, 7 May 2020'
  from: string = 'Toronto';
  to: string = 'New York';
  flightDuration: string = '4 hr 55 min';

  name: string = 'Ms. Anne Robin';
  age: number = 42;
  seatNumber: string = 'A4';
  baggageCount: number = 0;

  mask: number = 2;
  sanitizer: number = 1;
  gloves: number = 1;
  delivery: string = 'Gate';
  
  constructor() { }

  ngOnInit(): void {
  }

}
