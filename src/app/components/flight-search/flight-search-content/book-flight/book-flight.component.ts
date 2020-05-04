import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OriginService } from '../../../../services/origin/origin.service';
import {DestinationService} from '../../../../services/destination/destination.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';


@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookFlightComponent implements OnInit {  
  origins: any;
  destinations: any;

  adults: string = "0";
  children: string ="0";
  infants: string = "0";
  totalPassengers: number = 0;

  bookFlightsForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    depart: new FormControl('2020-05-07'),
    return: new FormControl('2020-05-31'),
    passengers: new FormGroup({
      adults: new FormControl(this.adults),
      children: new FormControl(this.children),
      infants: new FormControl(this.infants)
    }),
    class: new FormControl('Economy')
  });

  constructor(
    private router: Router,
    private OriginService : OriginService,
    private destinationService:DestinationService,
    private flightDetailsService: FlightDetailsService
  ) { }

  ngOnInit() {
    this.origins = this.OriginService.getOrigins();
    this.destinations = this.destinationService.getDestination(this.origins.data.origins[0].code);

    this.bookFlightsForm.setValue({
      from: this.origins.data.origins[1].name,
      to: this.destinations.data.destinations[0].name,
      depart: '2020-05-07',
      return: '2020-05-31',
      passengers: {
        adults: this.adults,
        children: this.children,
        infants: this.infants
      },
      class: 'Economy'
    })

    this.bookFlightsForm.valueChanges.subscribe(form => {
      this.totalPassengers = Number(this.adults) + Number(this.children) + Number(this.infants);
      console.log('value',this.bookFlightsForm.value);
    })
  }

  onFlightSearch() {
    console.log('search flights');
    this.flightDetailsService.setFlightDetails(this.bookFlightsForm.value);
    this.router.navigate(['/flight-list']);
  }

  onSelect(value): void {
    console.log('selected')
    // fetches values from destination service
    this.destinations = this.destinationService.getDestination(value);
  }

}
