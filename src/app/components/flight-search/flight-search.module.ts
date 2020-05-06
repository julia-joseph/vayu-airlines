import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchComponent } from './flight-search.component';
import { FlightSearchContentComponent } from './flight-search-content/flight-search-content.component';
import { BookFlightComponent } from './flight-search-content/book-flight/book-flight.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainModule } from '../main/main.module';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FlightSearchComponent,
    FlightSearchContentComponent,
    BookFlightComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    MainModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
  ],
  exports: [
    FlightSearchComponent,
    FlightSearchContentComponent,
    BookFlightComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class FlightSearchModule {}
