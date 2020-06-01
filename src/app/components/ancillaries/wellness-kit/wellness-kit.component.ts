import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { ExpandedAncillariesDialogComponent } from '../expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';

@Component({
  selector: 'app-wellness-kit',
  templateUrl: './wellness-kit.component.html',
  styleUrls: ['./wellness-kit.component.scss']
})
export class WellnessKitComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onSkipToIFE = new EventEmitter<void>();

  deliveryLocations: string[] = ['Gate','Lounge','In flight','Check-In Counter'];
  segmentOptions: string[] = ['JFK - BOS'];
  submitted: boolean = false;
  showPayment: boolean = false;
  segment: string = 'JFK - BOS';

  wellnessKitForm: FormGroup = new FormGroup({
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
    boxedMealVegSize: new FormControl('Adult/Veg Sandwich'),
    boxedMealVegPrice: new FormControl(20),
    boxedMealVegSubscription: new FormControl(false),
    delivery: new FormControl('Gate'),
    segment: new FormControl('JFK - BOS'),
    additionalItems: new FormArray([ ])
  });

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

  // itemAdded: boolean = false;
  totalPrice: number = 28.74;
  totalQty: number = 0;
  ogForm;
  isNewItemsAdded: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService
  ) {}

  ngOnInit(): void {
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.wellnessKitService.setWellnessKitFormGroup(this.wellnessKitForm);
    this.wellnessKitForm.valueChanges.subscribe(() => {
      let itemTotal = 0.00;
      this.wellnessKitForm.get('additionalItems').value.forEach(e => {
        let q = e.quantity === 'Select' ? 0 : e.quantity;
        itemTotal = itemTotal + q * e.price;
      })

      this.totalPrice = 
        this.wellnessKitForm.get('maskQuantity').value * this.wellnessKitForm.get('maskPrice').value +
        this.wellnessKitForm.get('sanitizerQuantity').value * this.wellnessKitForm.get('sanitizerPrice').value +
        this.wellnessKitForm.get('glovesQuantity').value * this.wellnessKitForm.get('glovesPrice').value +
        this.wellnessKitForm.get('boxedMealVegQuantity').value * this.wellnessKitForm.get('boxedMealVegPrice').value +
        itemTotal;
    });

    this.wellnessKitService.performConfirmObservable.subscribe((wellnessKit) => {
      this.wellnessKitForm.setValue({
        ...this.wellnessKitService.getWellnessKitDetails()
      })
      this.onConfirm();
    })

    this.wellnessKitService.performEditObservable.subscribe(() => {
      this.onEdit();
    })

    this.wellnessKitService.performSkipObservable.subscribe(() => {
      this.onSkipToDigitalIFE();
    })
  }

  ngAfterViewChecked() {
      if(this.isNewItemsAdded) {
        this.scrollToBottom();
      }
  }

  public onScroll() {
      let element = this.myScrollContainer.nativeElement
      let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
      if (this.disableScrollDown && atBottom) {
          this.disableScrollDown = false
      } else {
          this.disableScrollDown = true
      }
  }

  private scrollToBottom(): void {
      if (this.disableScrollDown) {
          return
      }
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }

  get additionalItems() {
    return this.wellnessKitForm.get('additionalItems') as FormArray;
  }

  addAdditionalItems() {
    if(this.submitted) return;
    this.isNewItemsAdded = true;
    this.additionalItems.push(new FormGroup({
      item: new FormControl('Select'),
      quantity: new FormControl('Select'),
      size: new FormControl('Select'),
      price: new FormControl(0),
      subscription: new FormControl(false)
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

    if(name === 'Sanitizer') {
      price = 2.30;
      size = '1 OZ (30 mL)';
    }
    else if(name === 'Gloves') {
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

  onCancel() {}

  calculateTotalQuantity(){
    let itemsQty = 0;
    this.additionalItems.value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemsQty = itemsQty + q;
    })
    this.totalQty =
      this.wellnessKitForm.get('maskQuantity').value+
      this.wellnessKitForm.get('sanitizerQuantity').value +
      this.wellnessKitForm.get('glovesQuantity').value +
      this.wellnessKitForm.get('boxedMealVegQuantity').value +
      itemsQty;
  }

  setWellnessKitDetails(){
    this.wellnessKitService.setTotalPrice(this.totalPrice);
    this.wellnessKitService.setTotalKitQty(this.totalQty);
    this.wellnessKitService.setWellnessKitDetails({
      ...this.wellnessKitForm.value
    });

    this.submitted = true;
    this.wellnessKitService.submitted = this.submitted;
  }

  onConfirm() {
    this.calculateTotalQuantity();
    this.setWellnessKitDetails();
    this.onSubmit.emit();
  }

  onSkipToDigitalIFE() {
    if(!this.submitted){
      this.totalQty = 0;
      this.wellnessKitForm.patchValue({
        maskQuantity: 0,
        sanitizerQuantity: 0,
        glovesQuantity: 0,
        boxedMealVegQuantity: 0
      })
      this.setWellnessKitDetails();
    }
    
    this.onSkipToIFE.emit();
  }

  onEdit() {
    this.submitted = false;
    this.wellnessKitService.submitted = this.submitted;
    this.wellnessKitService.setShowPayment(false);
  }

  openExpandedAncDialog() {
    const dialogRef = this.dialog.open(ExpandedAncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '170vh',
      data: {
        wellnessKitForm: this.wellnessKitForm,
        wellnessKitTotalPrice: this.totalPrice,
        digitalIfeForm: null,
        digitalIfeTotalPrice: null,
        adjacentSeatForm: null,
        adjacentSeatTotalPrice: null,
        selectedTab: 0
      }
    });
  }

  openDetails() {
    console.log('open details');
  }
}
