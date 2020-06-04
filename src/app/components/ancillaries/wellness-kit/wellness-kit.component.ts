import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { ExpandedAncillariesDialogComponent } from '../expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-wellness-kit',
  templateUrl: './wellness-kit.component.html',
  styleUrls: ['./wellness-kit.component.scss']
})
export class WellnessKitComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false;
  
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
    items: new FormArray([ ]),
    delivery: new FormControl('Gate'),
    segment: new FormControl('JFK - BOS'),
    additionalItems: new FormArray([ ])
  });

  applySubForm: FormGroup = new FormGroup({
    self: new FormControl(false),
    pone: new FormControl(false),
    ptwo: new FormControl(false),
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

  totalPrice: number = 0;
  totalQty: number = 0;
  ogForm;
  isNewItemsAdded: boolean = false;

  isFirstBooking: boolean = false;
  isSubscriptionAdded: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService,
    private flightService: FlightDetailsService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.isFirstBooking = this.flightService.isFirstBooking();
    this.setInitialItems();
    this.calculateTotalPrice();

    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.wellnessKitService.setWellnessKitFormGroup(this.wellnessKitForm);
    this.wellnessKitService.setWellnessApplySubFormGroup(this.applySubForm);
    this.wellnessKitForm.valueChanges.subscribe(() => {
      console.log('wellness form',this.wellnessKitForm.value);
      console.log('wellness formGroup',this.wellnessKitForm);
      this.calculateTotalPrice();
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

    this.applySubForm.valueChanges.subscribe(() => {
      this.checkSubscriptionAdded();
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

  setInitialItems() {
    if(this.isFirstBooking) {
      this.items.push(this.addItemAsFormGroup('Mask',1,'Adult/M',5.24));
      this.items.push(this.addItemAsFormGroup('Sanitizer',1,'1 OZ (30 mL)',2.3));
      this.items.push(this.addItemAsFormGroup('Gloves',1,'Adult/M',1.2));
      this.items.push(this.addItemAsFormGroup('Boxed Meal',1,'Adult/Veg Sandwich',20));
    }
  }

  get items() {
    return this.wellnessKitForm.get('items') as FormArray;
  }

  addItemAsFormGroup(item: string, quantity: number, size: string, price: number, 
                    sub: boolean = false, self: boolean = false, pone: boolean = false, ptwo: boolean = false) {
    return new FormGroup({
      item: new FormControl(item),
      quantity: new FormControl(quantity),
      size: new FormControl(size),
      price: new FormControl(price),
      subscription: new FormControl(sub),
      self: new FormControl(self),
      pone: new FormControl(pone),
      ptwo: new FormControl(ptwo)
    })
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
      subscription: new FormControl(false),
      self: new FormControl(false),
      pone: new FormControl(false),
      ptwo: new FormControl(false)
    }))
  }

  removeAdditionalItem(i: number): void { 
    this.additionalItems.removeAt(i);
  }

  removeItem(i: number): void { 
    this.items.removeAt(i);
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
      quantity: 1,
      subscription: false,
      self: false,
      pone: false,
      ptwo: false
    })
  }

  onCancel() {}

  calculateTotalPrice() {
    let itemTotal = 0.00;

    this.wellnessKitForm.get('items').value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemTotal = itemTotal + q * e.price;
    })

    this.wellnessKitForm.get('additionalItems').value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemTotal = itemTotal + q * e.price;
    })

    this.totalPrice = itemTotal;
  }

  calculateTotalQuantity() {
    let itemsQty = 0;

    this.items.value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemsQty = itemsQty + q;
    })

    this.additionalItems.value.forEach(e => {
      let q = e.quantity === 'Select' ? 0 : e.quantity;
      itemsQty = itemsQty + q;
    })

    this.totalQty = itemsQty;
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
      this.items.controls.forEach((itemGroup) => {
        itemGroup.patchValue({
          quantity: 0,
          subscription: false,
          self: false,
          pone: false,
          ptwo: false
        })
      });

      this.additionalItems.controls.forEach((itemGroup) => {
        itemGroup.patchValue({
          quantity: 0,
          subscription: false,
          self: false,
          pone: false,
          ptwo: false
        })
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

  clearFormArray() {
    while(this.items.value.length !== 0) {
      this.items.removeAt(0);
    }
  }

  checkSubscriptionAdded() {
    //check if any checkboxes are chosen. If yes, make the boolean true. For now its just set to true
    //this.isSubscriptionAdded = true;

    console.log('applysub',this.applySubForm.value);
    if(this.applySubForm.get('self').value || this.applySubForm.get('pone').value || this.applySubForm.get('ptwo').value) {
      this.isSubscriptionAdded = true;
      console.log('chosen applysub',this.applySubForm.value);
      this.clearFormArray();
      let subbedItems = this.subscriptionService.getWellnessKitSubscription();
      let finalItems = [];

      if(this.applySubForm.get('self').value) {
        console.log('true-self',subbedItems.filter(item => item.self));
        const selfSubbed = subbedItems.filter(item => item.self);
        if(selfSubbed.length){
          subbedItems = subbedItems.filter(item => !item.self);
          console.log('remaining subbed after self remove',subbedItems);
          finalItems = [...selfSubbed];   
        }     
      }

      if(this.applySubForm.get('pone').value) {
        console.log('true-pone',subbedItems.filter(item => item.pone));
        const poneSubbed = subbedItems.filter(item => item.pone);
        if(poneSubbed.length){
          subbedItems = subbedItems.filter(item => !item.pone);
          console.log('remaining subbed after self remove',subbedItems);
          finalItems = [...finalItems,...poneSubbed];   
        }    
      }

      if(this.applySubForm.get('ptwo').value) {
        console.log('true-pttwo',subbedItems.filter(item => item.ptwo));
        const ptwoSubbed = subbedItems.filter(item => item.ptwo);
        if(ptwoSubbed.length){
          subbedItems = subbedItems.filter(item => !item.ptwo);
          console.log('remaining subbed after self remove',subbedItems);
          finalItems = [...finalItems,...ptwoSubbed];   
        }            
      }

      console.log('finalSubbedItems',subbedItems)
      console.log('finalItems',finalItems)

      if(finalItems.length) {
        finalItems.forEach(item => {
          this.items.push(this.addItemAsFormGroup(item.item,item.quantity,item.size,item.price,
                                                item.subscription,item.self,item.pone,item.ptwo))})
      }
      
    }    
    else if (!this.applySubForm.get('self').value && !this.applySubForm.get('pone').value && !this.applySubForm.get('ptwo').value){
      this.isSubscriptionAdded = false;
    }
  }
}
