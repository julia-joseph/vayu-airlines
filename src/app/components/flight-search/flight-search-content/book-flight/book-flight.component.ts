import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
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
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFlightsearch() {
    console.log('search flights');
    this.router.navigate(['/flight-list']);
  }

}
