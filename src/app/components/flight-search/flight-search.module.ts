import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search.component';
import { FlightSearchNavbarComponent } from './flight-search-navbar/flight-search-navbar.component';
import { FlightSearchHeaderComponent } from './flight-search-header/flight-search-header.component';
import { FlightSearchContentComponent } from './flight-search-content/flight-search-content.component';
import { FlightSearchFooterComponent } from './flight-search-footer/flight-search-footer.component';
import { BookFlightComponent } from './flight-search-content/book-flight/book-flight.component';


@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchNavbarComponent,
    FlightSearchHeaderComponent,
    FlightSearchContentComponent,
    FlightSearchFooterComponent,
    BookFlightComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FlightSearchModule { }
