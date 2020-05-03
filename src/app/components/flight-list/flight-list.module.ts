import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list.component';
import { FlightListItemComponent } from './flight-list-item/flight-list-item.component';
import { MainModule } from '../main/main.module';
import { ReviewItineraryDialogComponent } from './review-itinerary-dialog/review-itinerary-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FlightListComponent,
    FlightListItemComponent,
    ReviewItineraryDialogComponent
  ],
  imports: [
    CommonModule,
    MainModule,
    MatDialogModule
  ],
  entryComponents: [
    ReviewItineraryDialogComponent
  ],
  exports: [
    FlightListComponent,
    FlightListItemComponent,
    ReviewItineraryDialogComponent,
    MatDialogModule
  ]
})
export class FlightListModule { }
