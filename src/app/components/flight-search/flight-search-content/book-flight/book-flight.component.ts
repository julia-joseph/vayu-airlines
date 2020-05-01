import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    passengers: new FormControl(''),
    children: new FormControl(''),
    infants: new FormControl('')
  });
  
  constructor() { }

  ngOnInit() {
  }

}
