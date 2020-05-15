import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  wellnessKitForm: FormGroup;
  totalPrice: number;
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
    
    this.wellnessKit.valueChanges.subscribe(() => {
      let itemTotal = 0.00;
      this.wellnessKit.get('additionalItems').value.forEach(e => {
        itemTotal = itemTotal + e.quantity * e.price;
      })

      this.totalPrice = 
        this.wellnessKit.get('maskQuantity').value * this.wellnessKit.get('maskPrice').value +
        this.wellnessKit.get('sanitizerQuantity').value * this.wellnessKit.get('sanitizerPrice').value +
        this.wellnessKit.get('glovesQuantity').value * this.wellnessKit.get('glovesPrice').value +
        itemTotal;
    });
  }

  get additionalItems() {
    return this.wellnessKit.get('additionalItems') as FormArray;
  }

  onConfirm() {
    this.dialogRef.close(this.wellnessKit);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
