import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AncillariesDialogComponent } from './ancillaries-dialog/ancillaries-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WellnessKitDetailsService } from 'src/app/services/wellness-kit-details/wellness-kit-details.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ExpandedAncillariesDialogComponent } from './expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';

@Component({
  selector: 'app-ancillaries',
  templateUrl: './ancillaries.component.html',
  styleUrls: ['./ancillaries.component.scss'],
})
export class AncillariesComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Output() onSubmit = new EventEmitter<void>();
  deliveryLocations: string[] = ['Gate','Lounge','In flight','Check-In Counter'];
  segmentOptions: string[] = ['JFK - BOS'];
  submitted: boolean = false;
  showPayment: boolean = false;
  segment: string = 'JFK - BOS';

  wellnessKitForm: FormGroup = new FormGroup({
    maskQuantity: new FormControl(1),
    maskSize: new FormControl('Adult/M'),
    maskPrice: new FormControl(5.24),
    sanitizerQuantity: new FormControl(1),
    sanitizerSize: new FormControl('1 OZ (30 mL)'),
    sanitizerPrice: new FormControl(2.3),
    glovesQuantity: new FormControl(1),
    glovesSize: new FormControl('Adult/M'),
    glovesPrice: new FormControl(1.2),
    delivery: new FormControl('Gate'),
    segment: new FormControl('JFK - BOS'),
    additionalItems: new FormArray([ ])
  });

  itemNameOptions: string[] = ['Mask','Sanitizer','Gloves'];
  itemQuantityOptions: number[] = [0,1,2];
  itemSizeOptions: any[] = [
    ['Infant','Child/XS','Child/S','Child/M','Child/L','Adult/XS','Adult/S','Adult/M','Adult/L'],
    ['1 OZ (30 mL)', '2 OZ (60 mL)'],
    ['Size 1 Infant', 'Size 2 (age 3 to 4)', 'Size 3 (age 5 to 6)','Size 4 (age 7 to 8)', 
    'Size 5 (age 9 to 10)', 'Size 6 (age 11 to 13', 'Size 7 (age 14 to 17)', 'Adult/S', 'Adult/M', 'Adult/L']
  ];

  // itemAdded: boolean = false;
  totalPrice: number = 8.74;
  totalQty: number = 0;
  ogForm;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private wellnessKitService: WellnessKitDetailsService
  ) {}

  ngOnInit(): void {
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.wellnessKitForm.valueChanges.subscribe(() => {
      let itemTotal = 0.00;
      this.wellnessKitForm.get('additionalItems').value.forEach(e => {
        itemTotal = itemTotal + e.quantity * e.price;
      })

      this.totalPrice = 
        this.wellnessKitForm.get('maskQuantity').value * this.wellnessKitForm.get('maskPrice').value +
        this.wellnessKitForm.get('sanitizerQuantity').value * this.wellnessKitForm.get('sanitizerPrice').value +
        this.wellnessKitForm.get('glovesQuantity').value * this.wellnessKitForm.get('glovesPrice').value +
        itemTotal;
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

  get additionalItems() {
    return this.wellnessKitForm.get('additionalItems') as FormArray;
  }

  addAdditionalItems() {
    if(this.submitted) return;
    // this.itemAdded = true;
    this.additionalItems.push(new FormGroup({
      item: new FormControl('Mask'),
      quantity: new FormControl(1),
      size: new FormControl('Adult/M'),
      price: new FormControl(5.24)
    }))
  }

  removeItem(i: number): void { 
    this.additionalItems.removeAt(i);
    // if(this.additionalItems.length === 0) {
    //   this.itemAdded= false;
    // }
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
      price: price
    })
  }

  onCancel() {}

  calculateTotalQuantity(){
    let itemsQty = 0;
    this.additionalItems.value.forEach(e => {
      itemsQty = itemsQty + e.quantity;
    })
    this.totalQty =
      this.wellnessKitForm.get('maskQuantity').value+
      this.wellnessKitForm.get('sanitizerQuantity').value +
      this.wellnessKitForm.get('glovesQuantity').value +
      itemsQty;
  }

  onConfirm() {
    this.calculateTotalQuantity();
    this.wellnessKitService.setTotalPrice(this.totalPrice);
    this.wellnessKitService.settotalKitQty(this.totalQty);
    this.wellnessKitService.setWellnessKitDetails({
      ...this.wellnessKitForm.value
    });

    this.submitted = true;
    
    this.onSubmit.emit();
    // const dialogRef = this.dialog.open(AncillariesDialogComponent, {
    //   panelClass: 'custom-dialog-container',
    //   width: '700px',
    //   data: {
    //     flightCode: this.fromCode + ' - ' + this.toCode,
    //     ...this.wellnessKitForm.value,
    //     totalPrice: this.totalPrice
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.wellnessKitService.setWellnessKitDetails({
    //       ...this.wellnessKitForm.value
    //     });

    //     this.submitted = true;
       
    //     this.onSubmit.emit();
    //   }
    // });
  }

  onSkip() { 
    this.wellnessKitService.setShowPayment(true);
  }

  onEdit() {
    this.submitted = false;
    this.wellnessKitService.setShowPayment(false);
  }

  openExpandedAncDialog() {
    if(this.submitted) return;
    //this.ogForm = {...this.wellnessKitForm.value};
    const dialogRef = this.dialog.open(ExpandedAncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '170vh',
      data: {
        wellnessKitForm: this.wellnessKitForm,
        totalPrice: this.totalPrice,
        itemSizeOptions: this.itemSizeOptions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.confirmed) {
        this.wellnessKitForm.setValue({
          ...result.wellnessKit.value
        });
        this.onConfirm()
      }
      else {
        this.wellnessKitForm.setValue({
          ...result.wellnessKit.value
        });
      }
      // else {
      //   this.wellnessKitForm.setValue({
      //     ...this.ogForm
      //   });
      // }      
    });
  }
}
