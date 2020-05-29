import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpandedAncillariesDialogComponent } from '../expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';

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
    primaryPackageType: new FormControl('Premium'),
    primaryScreens: new FormControl(2),
    primaryPrice: new FormControl(5.24),
    primarySubscription: new FormControl(false),
    secondaryPackageType: new FormControl('Kids Play'),
    secondaryScreens: new FormControl(1),
    secondaryPrice: new FormControl(2.30),
    secondarySubscription: new FormControl(false),
    segment: new FormControl('JFK - BOS'),
    additionalItems: new FormArray([ ])
  })

  segmentOptions: string[] = ['JFK - BOS'];
  submitted: boolean = false;
  showPayment: boolean = false;
  segment: string = 'JFK - BOS';

  packageTypeOptions: string[] = ['Basic', 'Premium', 'VIP', 'Kids Play'];
  screenOptions: number[] = [0, 1, 2];

  totalPrice: number = 12.78;
  totalQuantity: number = 3;
  
  constructor(
    public dialog: MatDialog,
    public digitalIfeService: DigitalIfeDetailsService
  ) { }

  ngOnInit(): void {
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.digitalIfeForm.valueChanges.subscribe(() => {
      console.log('form',this.digitalIfeForm.value);
      let itemTotal = 0.00;
      this.digitalIfeForm.get('additionalItems').value.forEach(e => {
        let q = e.screens === 'Select' ? 0 : e.screens;
        itemTotal = itemTotal + q * e.price;
      })

      this.totalPrice = 
        this.digitalIfeForm.get('primaryScreens').value * this.digitalIfeForm.get('primaryPrice').value +
        this.digitalIfeForm.get('secondaryScreens').value * this.digitalIfeForm.get('secondaryPrice').value +
        itemTotal;
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

  get additionalItems() {
    return this.digitalIfeForm.get('additionalItems') as FormArray;
  }

  addAdditionalItems() {
    if(this.submitted) return;
    this.additionalItems.push(new FormGroup({
      packageType: new FormControl('Select'),
      screens: new FormControl('Select'),
      price: new FormControl(0),
      subscription: new FormControl(false)
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
    this.additionalItems.removeAt(i);
  }

  setPriceOfNewItem(itemGroup){
    const name = itemGroup.get('packageType').value;
    let price = 5.24;

    if(name === 'Basic'){
      price = 3.60;
    }
    else if(name === 'VIP'){
      price = 8.99;
    }
    else if(name === 'Kids Play'){
      price = 2.30;
    }
    
    itemGroup.patchValue({
      screens: 2,
      price: price,
      subscription: false
    })
  }

  calculateTotalQuantity(){
    let itemsQty = 0;
    this.additionalItems.value.forEach(e => {
      itemsQty = itemsQty + e.quantity;
    })
    this.totalQuantity =
      this.digitalIfeForm.get('primaryScreens').value +
      this.digitalIfeForm.get('secondaryScreens').value +
      itemsQty;
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
      this.digitalIfeForm.patchValue({
        primaryScreens: 0,
        secondaryScreens: 0
      })
      this.setDigitalIfeDetails();
    }
    
    this.onSkipToSR.emit();
  }
}
