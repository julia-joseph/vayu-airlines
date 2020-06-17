import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';

@Component({
  selector: 'app-expanded-digital-ife',
  templateUrl: './expanded-digital-ife.component.html',
  styleUrls: ['./expanded-digital-ife.component.scss']
})
export class ExpandedDigitalIFEComponent implements OnInit, AfterViewChecked {
  @Input() isFirstBooking = true;
  @Input() digitalIfeForm: FormGroup;
  @Input() totalPrice;
  @Output() onDIFESkip = new EventEmitter<void>();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false;

  segmentOptions: string[] = ['JFK - BOS'];
  submitted: boolean = false;
  segment: string = 'JFK - BOS';

  packageTypeOptions: string[] = ['Basic', 'Premium', 'VIP', 'Kids Play'];
  screenOptions: number[] = [0, 1, 2];

  totalQuantity: number = 1;

  applySubForm: FormGroup;
  isSubscriptionAdded: boolean = false;
  
  constructor(
    private digitalIfeService: DigitalIfeDetailsService
  ) { }

  ngOnInit(): void {
    this.applySubForm = this.digitalIfeService.getDigitalApplySubFormGroup();
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

    this.submitted = this.digitalIfeService.submitted;
    this.calculateTotalPrice();
    this.digitalIfeForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
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

  get items() {
    return this.digitalIfeForm.get('items') as FormArray;
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

  calculateTotalPrice() {
    let itemTotal = 0.00;

    this.digitalIfeForm.get('items').value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemTotal = itemTotal + q * e.price;
    })

    this.digitalIfeForm.get('additionalItems').value.forEach(e => {
      let q = e.screens === 'Select' ? 0 : e.screens;
      itemTotal = itemTotal + q * e.price;
    });

    this.totalPrice = itemTotal;
  }

  openDetails() {

  }

  onConfirm() {
    this.submitted = true;
    this.digitalIfeService.setConfirmMiniViewDigitalIFE(this.digitalIfeForm.value);
  }

  onEdit() {
    this.submitted = false;
    this.digitalIfeService.setEditMiniViewDigitalIFE();
  }

  onSkip() {
    this.digitalIfeService.setSkipMiniViewDigitalIFE();
    this.onDIFESkip.emit();
  }
}
