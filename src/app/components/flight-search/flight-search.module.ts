import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search.component';
import { FlightSearchContentComponent } from './flight-search-content/flight-search-content.component';
import { BookFlightComponent } from './flight-search-content/book-flight/book-flight.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainModule } from '../main/main.module';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchContentComponent,
    BookFlightComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MainModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports: [
    FlightSearchComponent,
    FlightSearchContentComponent,
    BookFlightComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
  ],
})
export class FlightSearchModule {}
