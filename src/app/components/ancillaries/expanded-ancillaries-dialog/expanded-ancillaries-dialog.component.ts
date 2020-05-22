import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  wellnessKitForm: FormGroup;
  totalPrice: number;
  itemSizeOptions: any[];
  fromCode: string;
  toCode: string;
}

@Component({
  selector: 'app-expanded-ancillaries-dialog',
  templateUrl: './expanded-ancillaries-dialog.component.html',
  styleUrls: ['./expanded-ancillaries-dialog.component.scss']
})
export class ExpandedAncillariesDialogComponent implements OnInit {
  wellnessKit: FormGroup;
  totalPrice: number = 8.74;
    
  constructor(
    public dialogRef: MatDialogRef<ExpandedAncillariesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.wellnessKit = this.data.wellnessKitForm;
    this.totalPrice = this.data.totalPrice;
  }

  onConfirm() {
    this.dialogRef.close({
      wellnessKit: this.wellnessKit,
      confirmed: true
    });
  }

  onCancel() {
    this.dialogRef.close({
      wellnessKit: this.wellnessKit,
      confirmed: false
    });
  }

  onSubmitOfWellnessKit() {

  }

  onSkipToDigitalIFE() {
    
  }
}
