import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';

@Component({
  selector: 'app-expanded-wellness-kit',
  templateUrl: './expanded-wellness-kit.component.html',
  styleUrls: ['./expanded-wellness-kit.component.scss']
})
export class ExpandedWellnessKitComponent implements OnInit {
  @Input() isFirstBooking = true;
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

  applySubForm: FormGroup;
  isSubscriptionAdded: boolean = false;

  constructor(
    private wellnessKitServices: WellnessKitDetailsService
  ) { }

  ngOnInit(): void {
    this.applySubForm = this.wellnessKitServices.getWellnessApplySubFormGroup();
    if(this.applySubForm.get('self').value || this.applySubForm.get('pone').value || this.applySubForm.get('ptwo').value) {
      this.isSubscriptionAdded = true;
    }
    
    this.applySubForm.valueChanges.subscribe(() => {
      if(this.applySubForm.get('self').value || this.applySubForm.get('pone').value || this.applySubForm.get('ptwo').value) {
        this.isSubscriptionAdded = true;
      }
      if(!this.applySubForm.get('self').value && !this.applySubForm.get('pone').value && !this.applySubForm.get('ptwo').value) {
        this.isSubscriptionAdded = false;
      }
    })

    this.submitted = this.wellnessKitServices.submitted;
    this.calculateTotalPrice();
    this.wellnessKit.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  get items() {
    return this.wellnessKit.get('items') as FormArray;
  }

  get additionalItems() {
    return this.wellnessKit.get('additionalItems') as FormArray;
  }

  addAdditionalItems() {
    if(this.submitted) return;
    this.additionalItems.push(new FormGroup({
      item: new FormControl('Select'),
      quantity: new FormControl('Select'),
      size: new FormControl('Select'),
      price: new FormControl(0),
      subscription: new FormControl(false),
      self: new FormControl(false),
      pone: new FormControl(false),
      ptwo: new FormControl(false)
    }))
  }

  removeItem(i: number): void { 
    this.items.removeAt(i);
  }

  removeAdditionalItem(i: number): void { 
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
      price = 3.50;
      size = 'Adult/Veg Sandwich';
    }

    itemGroup.patchValue({
      size: size,
      price: price,
      quantity: 1,
      subscription: false,
      self: false,
      pone: false,
      ptwo: false
    })
  }

  openDetails() {
    console.log('open details');
  }

  calculateTotalPrice() {
    let itemTotal = 0.00;

    this.wellnessKit.get('items').value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemTotal = itemTotal + q * e.price;
    })

    this.wellnessKit.get('additionalItems').value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemTotal = itemTotal + q * e.price;
    })

    this.totalPrice = itemTotal;
  }

  onConfirm() {
    this.submitted = true;
    this.wellnessKitServices.setWellnessKitDetails({
      ...this.wellnessKit.value
    });
    this.wellnessKitServices.setConfirmMiniViewWellnessKit(this.wellnessKit.value);
  }

  onEdit() {
    this.submitted = false;
    this.wellnessKitServices.setEditMiniViewWellnessKit();
  }

  onSkip() {
    this.wellnessKitServices.setSkipMiniViewWellnessKit();
    this.onWSkip.emit();
  }
}
