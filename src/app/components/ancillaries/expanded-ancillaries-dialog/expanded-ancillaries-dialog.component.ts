import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  wellnessKitForm: FormGroup;
  totalPrice: number;
  itemSizeOptions: any[];
}

@Component({
  selector: 'app-expanded-ancillaries-dialog',
  templateUrl: './expanded-ancillaries-dialog.component.html',
  styleUrls: ['./expanded-ancillaries-dialog.component.scss']
})
export class ExpandedAncillariesDialogComponent implements OnInit {
  wellnessKit: FormGroup;
  totalPrice: number = 8.74;
  itemNameOptions: string[] = ['Mask','Sanitizer','Gloves'];
  
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
        let q = e.quantity === 'Select' ? 0 : e.quantity;
        itemTotal = itemTotal + q * e.price;
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

  addAdditionalItems() {
    this.additionalItems.push(new FormGroup({
      item: new FormControl('Select'),
      quantity: new FormControl('Select'),
      size: new FormControl('Select'),
      price: new FormControl(0)
    }))
  }

  removeItem(i: number): void { 
    this.additionalItems.removeAt(i);
  }

  setPriceOfNewItem(itemGroup){
    console.log('something');
    console.log('itemGroup',itemGroup)
    const name = itemGroup.get('item').value;
    let price = 5.24;
    let size = 'Adult/M'

    if(name === 'Sanitizer'){
      price = 2.30;
      size = '1 OZ (30 mL)';
    }
    else if(name === 'Gloves'){
      price = 1.20;
    }

    itemGroup.patchValue({
      size: size,
      price: price,
      quantity: 1
    })
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
}
