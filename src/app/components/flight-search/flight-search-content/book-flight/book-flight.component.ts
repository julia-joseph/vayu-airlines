import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OriginService } from '../../../../services/origin/origin.service';
import {DestinationService} from '../../../../services/destination/destination.service';


@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookFlightComponent implements OnInit {
  bookFlightsForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    depart: new FormControl(''),
    return: new FormControl(''),
    passengers: new FormGroup({
      adults: new FormControl(''),
      children: new FormControl(''),
      infants: new FormControl('')
    }),
    class: new FormControl('')
  });
  
  adults: string = 'option1';
  children: string ="option1";
  infants: string = "option1";
  origins: any;
  destinations: any;
  constructor(
    private router: Router,
    private OriginService : OriginService,
    private destinationService:DestinationService
  ) { }

  ngOnInit() {
    this.origins = this.OriginService.getOrigins();
    this.destinations = this.destinationService.getDestination(this.origins.data.origins[0].code);
  }

  onFlightsearch() {
    console.log('search flights');
    this.router.navigate(['/flight-list']);
  }

  onSelect(value): void {
	
    console.log('selected')
    // fetches values from destination service
    this.destinations = this.destinationService.getDestination(value);
  }

}
