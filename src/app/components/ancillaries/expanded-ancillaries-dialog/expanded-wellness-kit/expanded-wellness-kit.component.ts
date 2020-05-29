import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';

@Component({
  selector: 'app-expanded-wellness-kit',
  templateUrl: './expanded-wellness-kit.component.html',
  styleUrls: ['./expanded-wellness-kit.component.scss']
})
export class ExpandedWellnessKitComponent implements OnInit {
  @Input() wellnessKit = null;
  @Input() totalPrice = 0;
  @Output() onWSkip = new EventEmitter<void>();

  itemNameOptions: string[] = ['Mask','Sanitizer','Gloves','Boxed Meal'];
  itemQuantityOptions: number[] = [0, 1, 2];
  itemSizeOptions: any[] = [
    ['Infant','Child/XS','Child/S','Child/M','Child/L','Adult/XS','Adult/S','Adult/M','Adult/L'],
    ['1 OZ (30 mL)', '2 OZ (60 mL)'],
    ['Size 1 Infant', 'Size 2 (age 3 to 4)', 'Size 3 (age 5 to 6)','Size 4 (age 7 to 8)', 
    'Size 5 (age 9 to 10)', 'Size 6 (age 11 to 13', 'Size 7 (age 14 to 17)', 'Adult/S', 'Adult/M', 'Adult/L'],
    ['Adult/Veg Sandwich','Kid/Veg Sandwich',
    'Adult/Chicken Burger','Kid/Chicken Burger',
    'Adult/Muffin','Kid/Muffin',
    'Adult/Rice Cake','Kid/Rice Cake']
  ];

  submitted: boolean = false;

  constructor(
    private wellnessKitServices: WellnessKitDetailsService
  ) { }

  ngOnInit(): void {
    this.submitted = this.wellnessKitServices.submitted;
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
    else if(name === 'Boxed Meal') {
      price = 20.00;
      size = 'Adult/Veg Sandwich';
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

  onConfirm() {
    this.submitted = true;
    this.wellnessKitServices.setConfirmMiniViewWellnessKit(this.wellnessKit.value);
  }

  onEdit() {
    this.submitted = false;
    this.wellnessKitServices.setEditMiniViewWellnessKit();
  }

  onSkip() {
    if(!this.submitted){
      this.wellnessKitServices.setSkipMiniViewWellnessKit();
    }
    
    this.onWSkip.emit();
  }
}
