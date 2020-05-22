import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-expanded-wellness-kit',
  templateUrl: './expanded-wellness-kit.component.html',
  styleUrls: ['./expanded-wellness-kit.component.scss']
})
export class ExpandedWellnessKitComponent implements OnInit {
  @Input() wellnessKit = null;
  @Input() totalPrice = 0;
  @Input() itemSizeOptions = [];
  @Output() onWCancel = new EventEmitter<void>();
  @Output() onWConfirm = new EventEmitter<void>();
  itemNameOptions: string[] = ['Mask','Sanitizer','Gloves'];

  constructor() { }

  ngOnInit(): void {
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

  addToSubscription() {
    console.log('subscription added');
  }

  removeFromSubscription() {
    console.log('subscription removed');
  }

  openDetails() {
    console.log('open details');
  }
  
  onCancel() {
    this.onWCancel.emit();
  }

  onConfirm() {
    this.onWConfirm.emit();
  }
}
