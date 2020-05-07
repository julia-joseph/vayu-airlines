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
  class: string = 'Economy';
  fromTimes: string[] = ['07:15','08:30','09:45','10:10','12:15'];
  toTimes: string[] = ['12:10','13:25','14:40','15:05','17:10'];
  connectionDetails: string = 'Non-Stop 4 hr 55 min';
  economyPrice: string[] = ['404','410','414','430','444'];
  businessPrice: string[] = ['848','854','858','879','894'];

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.flightDetails) {
      this.from = this.flightDetails.from;
      this.to = this.flightDetails.to;
      this.class = this.flightDetails.class;
    }
  }

  onFlightSelection() {
    if(this.show !== 0)
      return;

    const dialogRef = this.dialog.open(ReviewItineraryDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '1200px',
      data: {
        from: this.from,
        to: this.to,
        class: this.flightDetails.class ? this.flightDetails.class : 'Economy',
        passenger: 
          (this.flightDetails.passengers.adults + ' Adult ') +
          (this.flightDetails.passengers.children + ' Children ') +
          (this.flightDetails.passengers.infants + ' Infant'),   
        departDate: 
          this.flightDetails.depart ? moment(this.flightDetails.depart).format('ddd, D MMM YYYY') : 'Fri, 8 May 2020',
        returnDate: 
          this.flightDetails.return ? moment(this.flightDetails.depart).format('ddd, D MMM YYYY') : 'Fri, 8 May 2020',
        flightNum:  'VY912',
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
