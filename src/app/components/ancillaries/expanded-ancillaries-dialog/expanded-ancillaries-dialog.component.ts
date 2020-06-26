import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import { TravellerService } from 'src/app/services/traveller--details/traveller.service';

export interface DialogData {
  wellnessKitForm?: FormGroup;
  wellnessKitTotalPrice?: number;
  digitalIfeForm?: FormGroup;
  digitalIfeTotalPrice?: number;
  adjacentSeatForm?: FormGroup;
  adjacentSeatTotalPrice?: number;
  selectedTab: number;
  subscriptionName: any;
}

@Component({
  selector: 'app-expanded-ancillaries-dialog',
  templateUrl: './expanded-ancillaries-dialog.component.html',
  styleUrls: ['./expanded-ancillaries-dialog.component.scss']
})
export class ExpandedAncillariesDialogComponent implements OnInit {
  wellnessKit: FormGroup;
  wellnessKitTotalPrice: number = 8.74;
  digitalIfeForm: FormGroup;
  digitalIfeTotalPrice: number = 0.00;
  adjacentSeatForm: FormGroup;
  adjacentSeatTotalPrice: number = 65.32;
  selectedTab: number = 0;

  isFirstBooking: boolean = true;

  subscriptionName: any;

  constructor(
    public dialogRef: MatDialogRef<ExpandedAncillariesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wellnessKitService: WellnessKitDetailsService,
    private digitalIfeService: DigitalIfeDetailsService,
    private adjacentSeatService: AdjacentSeatDetailsService,
    private flightService: FlightDetailsService
  ) { }

  ngOnInit(): void {
    this.isFirstBooking = this.flightService.isFirstBooking();
    this.subscriptionName = this.data.subscriptionName;

    if(this.data.wellnessKitForm) {
      this.wellnessKit = this.data.wellnessKitForm;
      this.wellnessKitTotalPrice = this.data.wellnessKitTotalPrice;
    }
    else{
      this.wellnessKit = this.wellnessKitService.getWellnessKitFormGroup();
      if(this.isFirstBooking){
        this.wellnessKit.setValue({
          ...this.wellnessKitService.getWellnessKitDetails()
        })
      }
    }
    
    if(this.data.digitalIfeForm){
      this.digitalIfeForm = this.data.digitalIfeForm;
      this.digitalIfeTotalPrice = this.data.digitalIfeTotalPrice;
    }
    else {
      this.digitalIfeForm = this.digitalIfeService.getDigitalIfeFormGroup();
      if(this.isFirstBooking) {
        this.digitalIfeForm.setValue({
          ...this.digitalIfeService.getDigitalIfeDetails()
        })
      }
    }
    
    if(this.data.adjacentSeatForm){
      this.adjacentSeatForm = this.data.adjacentSeatForm;
      this.adjacentSeatTotalPrice = this.data.adjacentSeatTotalPrice;
    }
    else {
      this.adjacentSeatForm = this.adjacentSeatService.getAdjacentSeatFormGroup();
      if(this.isFirstBooking){
        this.adjacentSeatForm.setValue({
          ...this.adjacentSeatService.getAdjacentSeatDetails()
        })
      }
    }
    this.selectedTab = this.data.selectedTab;
  }

  onSeatRegroupingConfirm() {
    this.dialogRef.close({
      // adjacentSeatForm: this.adjacentSeatForm,
      // confirmed: true
    });
  }

  // onCancel() {
  //   this.dialogRef.close({
  //     wellnessKit: this.wellnessKit,
  //     confirmed: false
  //   });
  // }

  onSkipToDigitalIFE() {
    this.selectedTab = 1;
  }

  onSkipToSeatRegrouping() {
    this.selectedTab = 2;
  }
}
