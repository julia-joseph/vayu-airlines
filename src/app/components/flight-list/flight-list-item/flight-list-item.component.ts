import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewItineraryDialogComponent } from '../review-itinerary-dialog/review-itinerary-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-list-item',
  templateUrl: './flight-list-item.component.html',
  styleUrls: ['./flight-list-item.component.scss']
})
export class FlightListItemComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFlightSelection() {
    console.log('flight selected');

    const dialogRef = this.dialog.open(ReviewItineraryDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '1200px',
      data: {
        from: 'Toronto (YYZ)',
        to: 'New York (LGA)',
        class: 'Economy',
        passenger: '1 Adult 2 Children',
        departDate: 'Fri, 7 May 2020',
        returnDate: 'Fri, 7 May 2020',
        flightNum:  'AC7952',
        flightDuration: '4 hr 55 min',
        totalFare: 60.00,
        airportFee: 10.00,
        surCharge: 50.60

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //should be booking details page
        this.router.navigate(['/login']);
      }
    });
  }
}
