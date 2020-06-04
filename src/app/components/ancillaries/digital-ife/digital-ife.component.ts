import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpandedAncillariesDialogComponent } from '../expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-digital-ife',
  templateUrl: './digital-ife.component.html',
  styleUrls: ['./digital-ife.component.scss']
})
export class DigitalIFEComponent implements OnInit {
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onSkipToSR = new EventEmitter<void>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false
  
  digitalIfeForm: FormGroup = new FormGroup({
    items: new FormArray([ ]),
    segment: new FormControl('JFK - BOS'),
    additionalItems: new FormArray([ ])
  })

  applySubForm: FormGroup = new FormGroup({
    self: new FormControl(false),
    pone: new FormControl(false),
    ptwo: new FormControl(false)
  });

  segmentOptions: string[] = ['JFK - BOS'];
  submitted: boolean = false;
  showPayment: boolean = false;
  segment: string = 'JFK - BOS';

  packageTypeOptions: string[] = ['Basic', 'Premium', 'VIP', 'Kids Play'];
  screenOptions: number[] = [0, 1, 2];

  totalPrice: number = 0.00;
  totalQuantity: number = 1;
  
  isFirstBooking: boolean = false;
  isSubscriptionAdded: boolean = false;

  constructor(
    public dialog: MatDialog,
    public digitalIfeService: DigitalIfeDetailsService,
    public flightDetailsService: FlightDetailsService,
    public subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.isFirstBooking = this.flightDetailsService.isFirstBooking();
    this.setInitialItems();
    this.calculateTotalPrice();
    
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.digitalIfeService.setDigitalIfeFormGroup(this.digitalIfeForm);
    this.digitalIfeService.setDigitalApplySubFormGroup(this.applySubForm);

    this.digitalIfeForm.valueChanges.subscribe(() => {
      console.log('ife form',this.digitalIfeForm.value);
      this.calculateTotalPrice();
    });

    this.digitalIfeService.performConfirmObservable.subscribe(digitalIFE => {
      this.digitalIfeForm.setValue({
        ...digitalIFE
      })
      this.onConfirm();
    })

    this.digitalIfeService.performEditObservable.subscribe(() => {
      this.onEdit();
    })

    this.digitalIfeService.performSkipObservable.subscribe(() => {
      this.onSkipToSeatRegrouping();
    })

    this.applySubForm.valueChanges.subscribe(() => {
      this.checkSubscriptionAdded();
    })
  }

  ngAfterViewChecked() {
      this.scrollToBottom();
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
      this.items.push(this.addItemAsFormGroup('Basic',1,0.00));
      this.items.push(this.addItemAsFormGroup('Kids Play',0,1.00));
    }
  }

  get items() {
    return this.digitalIfeForm.get('items') as FormArray;
  }

  addItemAsFormGroup(packageType: string, screens: number, price: number,
                    sub: boolean = false, self: boolean = false, pone: boolean = false, ptwo: boolean = false) {
    return new FormGroup({
      packageType: new FormControl(packageType),
      screens: new FormControl(screens),
      price: new FormControl(price),
      subscription: new FormControl(sub),
      self: new FormControl(self),
      pone: new FormControl(pone),
      ptwo: new FormControl(ptwo)
    })
  }

  get additionalItems() {
    return this.digitalIfeForm.get('additionalItems') as FormArray;
  }

  addAdditionalItems() {
    if(this.submitted) return;
    this.additionalItems.push(new FormGroup({
      packageType: new FormControl('Select'),
      screens: new FormControl('Select'),
      price: new FormControl(0),
      subscription: new FormControl(false),
      self: new FormControl(false),
      pone: new FormControl(false),
      ptwo: new FormControl(false)
    }))
  }

  openExpandedAncDialog() {
    const dialogRef = this.dialog.open(ExpandedAncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '170vh',
      data: {
        wellnessKitForm: null,
        wellnessKitTotalPrice: null,
        digitalIfeForm: this.digitalIfeForm,
        digitalIfeTotalPrice: this.totalPrice,
        adjacentSeatForm: null,
        adjacentSeatTotalPrice: null,
        selectedTab: 1
      }
    });

  }

  openDetails() {

  }

  removeItem(i: number): void { 
    this.items.removeAt(i);
  }

  removeAdditionalItem(i: number): void { 
    this.additionalItems.removeAt(i);
  }

  mapSelectOptionPrice(name: string): number {
    if(name === 'Basic'){
      return 0.00;
    }
    else if(name === 'VIP'){
      return 1.00;
    }
    else if(name === 'Kids Play'){
      return 1.00;
    }
    return 1.50;
  }

  setPriceOfNewItem(itemGroup){
    const name = itemGroup.get('packageType').value;
    let price = this.mapSelectOptionPrice(name);
    
    itemGroup.patchValue({
      screens: 1,
      price: price,
      subscription: false,
      self: false,
      pone: false,
      ptwo: false
    })
  }

  calculateTotalQuantity(){
    let itemsQty = 0;

    this.items.value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemsQty = itemsQty + q;
    });

    this.additionalItems.value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemsQty = itemsQty + q;
    });

    this.totalQuantity = itemsQty;
  }

  calculateTotalPrice(){
    let itemTotal = 0.00;

    this.digitalIfeForm.get('items').value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemTotal = itemTotal + q * e.price;
    })

    this.digitalIfeForm.get('additionalItems').value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemTotal = itemTotal + q * e.price;
    })

    this.totalPrice = itemTotal;
  }

  setDigitalIfeDetails() {
    this.digitalIfeService.setTotalPrice(this.totalPrice);
    this.digitalIfeService.setTotalQuantity(this.totalQuantity);
    this.digitalIfeService.setDigitalIfeDetails({
      ...this.digitalIfeForm.value
    });

    this.submitted = true;
    this.digitalIfeService.submitted = this.submitted;
  }

  onConfirm() {
    this.calculateTotalQuantity();
    this.setDigitalIfeDetails();
    this.onSubmit.emit();
  }

  onEdit() {
    this.submitted = false;
    this.digitalIfeService.submitted = this.submitted;
    this.digitalIfeService.setShowPayment(false);
  }

  onSkipToSeatRegrouping() {
    if(!this.submitted){
      this.totalQuantity = 0;

      this.items.controls.forEach((itemGroup) => {
        itemGroup.patchValue({
          screens: 0,
          subscription: false,
          self: false,
          pone: false,
          ptwo: false
        })
      });

      this.additionalItems.controls.forEach((itemGroup) => {
        itemGroup.patchValue({
          screens: 0,
          subscription: false,
          self: false,
          pone: false,
          ptwo: false
        })
      });

      this.setDigitalIfeDetails();
    }
    
    this.onSkipToSR.emit();
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
      let subbedItems = this.subscriptionService.getDigitalIfeSubscription();
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
          this.items.push(this.addItemAsFormGroup(item.packageType,item.screens,item.price,
                                                item.subscription,item.self,item.pone,item.ptwo))})
      }
      
    }    
    else if (!this.applySubForm.get('self').value && !this.applySubForm.get('pone').value && !this.applySubForm.get('ptwo').value){
      this.isSubscriptionAdded = false;
    }
  }
}
