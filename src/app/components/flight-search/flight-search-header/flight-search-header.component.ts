import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-search-header',
  templateUrl: './flight-search-header.component.html',
  styleUrls: ['./flight-search-header.component.scss']
})
export class FlightSearchHeaderComponent implements OnInit {
  user: any = {
    name: 'Amy',
    points: 15000
  }
  constructor() { }

  ngOnInit() {
  }

}
