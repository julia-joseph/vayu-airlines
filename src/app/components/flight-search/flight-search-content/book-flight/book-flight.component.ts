import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OriginService } from '../../../../services/origin/origin.service';
import {DestinationService} from '../../../../services/destination/destination.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';

import * as moment from 'moment';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookFlightComponent implements OnInit {  
  origins: any;
  destinations: any;

  minDate: string = moment().format('YYYY-MM-DD');

  adults: string = "1";
  children: string = "0";
  infants: string = "0";
  totalPassengers: number = 1;

  bookFlightsForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    depart: new FormControl('2020-05-08'),
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
    private originService : OriginService,
    private destinationService:DestinationService,
    private flightDetailsService: FlightDetailsService
  ) { }

  ngOnInit() {
    this.origins = this.originService.getOrigins();
    this.destinations = this.destinationService.getDestination(this.origins.data.origins[0].code);

    this.bookFlightsForm.setValue({
      from: this.origins.data.origins[1].code,
      to: this.destinations.data.destinations[0].code,
      depart: '2020-05-08',
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
    const fromCode = this.bookFlightsForm.value.from;
    const toCode = this.bookFlightsForm.value.to;

    this.bookFlightsForm.value.depart = moment(this.bookFlightsForm.value.depart).format('dddd MMMM D YYYY');
    this.bookFlightsForm.value.from = this.originService.getOriginName(this.bookFlightsForm.value.from);
    this.bookFlightsForm.value.to = this.destinationService.getDestinationName(this.bookFlightsForm.value.to);

    this.flightDetailsService.setFlightDetails({
      ...this.bookFlightsForm.value,
      passengers: {
        adults: Number(this.adults),
        children: Number(this.children),
        infants: Number(this.infants)
      },
      fromCode: fromCode,
      toCode: toCode
    });
    
    this.router.navigate(['/flight-list']);
  }

  onSelect(value): void {
    console.log('selected')
    // fetches values from destination service
    this.destinations = this.destinationService.getDestination(value);
    this.bookFlightsForm.patchValue({
      from: value,
      to: this.destinations.data.destinations[0].code
    })
  }

}
