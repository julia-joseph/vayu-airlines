import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  from: string;
  to: string;
  class: string;
  passenger: string;
  departDate: string;
  returnDate: string;
  flightNum:  string;
  flightDuration: string;
  totalFare: number;
  airportFee: number;
  surCharge: number;
}

@Component({
  selector: 'app-review-itinerary-dialog',
  templateUrl: './review-itinerary-dialog.component.html',
  styleUrls: ['./review-itinerary-dialog.component.scss']
})


export class ReviewItineraryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewItineraryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onShare() {

  }

  onChange() {
    this.dialogRef.close();
  }

  onContinue() {
    this.dialogRef.close('Continue');
  }
}
