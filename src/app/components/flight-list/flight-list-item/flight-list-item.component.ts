import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewItineraryDialogComponent } from '../review-itinerary-dialog/review-itinerary-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-flight-list-item',
  templateUrl: './flight-list-item.component.html',
  styleUrls: ['./flight-list-item.component.scss']
})
export class FlightListItemComponent implements OnInit {
  @Input() flightDetails: any;
  @Input() show: number = 1;

  from: string = 'New York City area (NYC)';
  to: string = 'Los Angeles, CA (LAX)';
  fromTime: string = '07:15';
  toTime: string = '12:15';
  connectionDetails: string = 'Non-Stop 4 hr 55 min';
  economyPrice: string = '404';
  businessPrice: string = '848';

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.flightDetails) {
      this.from = this.flightDetails.from;
      this.to = this.flightDetails.to;
    }
  }

  onFlightSelection() {
    console.log('flight selected');

    const dialogRef = this.dialog.open(ReviewItineraryDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '1200px',
      data: {
        from: this.from,
        to: this.to,
        class: this.flightDetails.class ? this.flightDetails.class : 'Economy',
        passenger: 
          (this.flightDetails.passengers.adults ? this.flightDetails.passengers.adults + ' Adult ' : '1 Adult ') +
          (this.flightDetails.passengers.children ? this.flightDetails.passengers.children + ' Children ' : '2 Children '),
          //breaks design + (this.flightDetails.passengers.infants ? this.flightDetails.passengers.infants + ' Infant' : '1 Infant'),   
        departDate: 
          this.flightDetails.depart ? moment(this.flightDetails.depart).format('ddd, D MMM YYYY') : 'Fri, 8 May 2020',
        returnDate: 
          this.flightDetails.return ? moment(this.flightDetails.depart).format('ddd, D MMM YYYY') : 'Fri, 8 May 2020',
        flightNum:  'AC7952',
        flightDuration: '4 hr 55 min',
        totalFare: 60.00,
        airportFee: 10.00,
        surCharge: 50.60

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/booking-details']);
      }
    });
  }
}
