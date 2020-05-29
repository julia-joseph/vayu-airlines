import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';

export interface DialogData {
  wellnessKitForm?: FormGroup;
  wellnessKitTotalPrice?: number;
  digitalIfeForm?: FormGroup;
  digitalIfeTotalPrice?: number;
  adjacentSeatForm?: FormGroup;
  adjacentSeatTotalPrice?: number;
  selectedTab: number;
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
  digitalIfeTotalPrice: number = 12.78;
  adjacentSeatForm: FormGroup;
  adjacentSeatTotalPrice: number = 130.64;
  selectedTab: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ExpandedAncillariesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wellnessKitService: WellnessKitDetailsService,
    private digitalIfeService: DigitalIfeDetailsService,
    private adjacentSeatService: AdjacentSeatDetailsService
  ) { }

  ngOnInit(): void {
    if(this.data.wellnessKitForm){
      this.wellnessKit = this.data.wellnessKitForm;
      this.wellnessKitTotalPrice = this.data.wellnessKitTotalPrice;
    }
    else{
      this.wellnessKit = new FormGroup({
        maskQuantity: new FormControl(1),
        maskSize: new FormControl('Adult/M'),
        maskPrice: new FormControl(5.24),
        maskSubscription: new FormControl(false),
        sanitizerQuantity: new FormControl(1),
        sanitizerSize: new FormControl('1 OZ (30 mL)'),
        sanitizerPrice: new FormControl(2.3),
        sanitizerSubscription: new FormControl(false),
        glovesQuantity: new FormControl(1),
        glovesSize: new FormControl('Adult/M'),
        glovesPrice: new FormControl(1.2),
        glovesSubscription: new FormControl(false),
        boxedMealVegQuantity: new FormControl(1),
        boxedMealVegSize: new FormControl('Adult'),
        boxedMealVegPrice: new FormControl(20),
        boxedMealVegSubscription: new FormControl(false),
        delivery: new FormControl('Gate'),
        segment: new FormControl('JFK - BOS'),
        additionalItems: new FormArray([ ])
      });

      this.wellnessKit.setValue({
        ...this.wellnessKitService.getWellnessKitDetails()
      })
    }
    
    if(this.data.digitalIfeForm){
      this.digitalIfeForm = this.data.digitalIfeForm;
      this.digitalIfeTotalPrice = this.data.digitalIfeTotalPrice;
    }
    else {
      this.digitalIfeForm = new FormGroup({
        primaryPackageType: new FormControl('Premium'),
        primaryScreens: new FormControl(2),
        primaryPrice: new FormControl(5.24),
        primarySubscription: new FormControl(false),
        secondaryPackageType: new FormControl('Kids Play'),
        secondaryScreens: new FormControl(1),
        secondaryPrice: new FormControl(2.30),
        secondarySubscription: new FormControl(false),
        segment: new FormControl('JFK - BOS'),
        additionalItems: new FormArray([ ])
      });

      this.digitalIfeForm.setValue({
        ...this.digitalIfeService.getDigitalIfeDetails()
      })
    }
    
    if(this.data.adjacentSeatForm){
      this.adjacentSeatForm = this.data.adjacentSeatForm;
      this.adjacentSeatTotalPrice = this.data.adjacentSeatTotalPrice;
    }
    else {
      this.adjacentSeatForm = new FormGroup({
        seats: new FormControl(2),
        price: new FormControl(65.32),
        subscription: new FormControl(false),
        segment: new FormControl('JFK - BOS')
      });

      this.adjacentSeatForm.setValue({
        ...this.adjacentSeatService.getAdjacentSeatDetails()
      })
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
