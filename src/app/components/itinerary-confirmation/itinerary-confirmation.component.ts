import { Component, OnInit } from '@angular/core';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import * as moment from 'moment';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
import { Router } from '@angular/router';
import { DonationDialogComponent } from '../donation-dialog/donation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user-details/user.service';
@Component({
  selector: 'app-itinerary-confirmation',
  templateUrl: './itinerary-confirmation.component.html',
  styleUrls: ['./itinerary-confirmation.component.scss']
})
export class ItineraryConfirmationComponent implements OnInit {
  confirmmationCode: string = 'UIYEGY'
  flightNumber: string = 'AC7952'
  from: string = 'Toronto';
  to: string = 'New York';
  flightDuration: string = '4 hr 55 min';

  wellnessKit: any;
  totalWellnessKitPrice: number = 0;

  fromCode: string = 'YYZ';
  toCode: string = 'LGA';
  departDateFormat1: string = 'May 7 2020';
  departDateFormat2: string = 'Friday, May 7'

  totalPassengers: number = 1;
  finalPrice: number = 355.00;
  
  digitalIfe: any;
  totalDigitalIfePrice: number = 0;
  totalDigitalIfeQuantity: number = 0;

  adjacentSeat: any;
  totalAdjacentSeat: number = 0;

  email: string;

  constructor(
    private wellnessKitService: WellnessKitDetailsService,
    private flightDetailsService: FlightDetailsService,
    private digitalIfeService: DigitalIfeDetailsService,
    private adjacentSeatService: AdjacentSeatDetailsService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.flightDetailsService.setFirstBooking();
    
    this.wellnessKit = this.wellnessKitService.getWellnessKitDetails();
    this.totalWellnessKitPrice = this.wellnessKitService.totalPrice;

    this.digitalIfe = this.digitalIfeService.getDigitalIfeDetails();
    this.totalDigitalIfePrice = this.digitalIfeService.totalPrice;
    this.totalDigitalIfeQuantity = this.digitalIfeService.totalQuantity;
    
    this.adjacentSeat = this.adjacentSeatService.getAdjacentSeatDetails();
    this.totalAdjacentSeat = this.adjacentSeatService.totalPrice;

    this.finalPrice = this.finalPrice + this.totalWellnessKitPrice + this.totalDigitalIfePrice + this.totalAdjacentSeat;
    
    const details = this.flightDetailsService.getFlightDetails();
    this.fromCode = details.fromCode;
    this.toCode = details.toCode;
    this.from = details.from;
    this.to = details.to;
    this.departDateFormat1 = moment(details.depart).format('MMM D YYYY');
    this.departDateFormat2 = moment(details.depart).format('dddd, MMM D');
    this.totalPassengers = details.passengers.adults + details.passengers.children + details.passengers.infants;

    this.email = this.userService.getEmail();
  }

  onDonate() {
    this.router.navigate(['/donations']);
  }

  onDonateDialog(): void {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      panelClass: 'regulation-dialog-container',
      // height: '80vh',
      width: '200vh',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/donations']);
      }
    });
  }
}
