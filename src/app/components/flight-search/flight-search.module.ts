import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search.component';
import { FlightSearchContentComponent } from './flight-search-content/flight-search-content.component';
import { BookFlightComponent } from './flight-search-content/book-flight/book-flight.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainModule } from '../main/main.module';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchContentComponent,
    BookFlightComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MainModule
  ]
})
export class FlightSearchModule { }
