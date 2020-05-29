import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { DigitalIfeDetailsService } from 'src/app/services/digital-ife-details/digital-ife-details.service';

@Component({
  selector: 'app-expanded-digital-ife',
  templateUrl: './expanded-digital-ife.component.html',
  styleUrls: ['./expanded-digital-ife.component.scss']
})
export class ExpandedDigitalIFEComponent implements OnInit, AfterViewChecked {
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

  constructor(
    private digitalIfeService: DigitalIfeDetailsService
  ) { }

  ngOnInit(): void { 
    this.submitted = this.digitalIfeService.submitted;
    this.calculateTotalPrice();
    this.digitalIfeForm.valueChanges.subscribe(() => {
      console.log('form',this.digitalIfeForm.value);
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

  removeItem(i: number): void { 
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
      subscription: false
    })
  }

  mapPrimaryPackageToPrice(){
    const name = this.digitalIfeForm.get('primaryPackageType').value;
    let price = this.mapSelectOptionPrice(name);
    
    this.digitalIfeForm.patchValue({
      primaryScreens: 1,
      primaryPrice: price,
      primarySubscription: false
    })
  }

  mapSecondaryPackageToPrice(){
    const name = this.digitalIfeForm.get('secondaryPackageType').value;
    let price = this.mapSelectOptionPrice(name);
    
    this.digitalIfeForm.patchValue({
      secondaryScreens: 1,
      secondaryPrice: price,
      secondarySubscription: false
    })
  }

  calculateTotalPrice() {
    let itemTotal = 0.00;
      this.digitalIfeForm.get('additionalItems').value.forEach(e => {
        let q = e.screens === 'Select' ? 0 : e.screens;
        itemTotal = itemTotal + q * e.price;
      })

      this.totalPrice = 
        this.digitalIfeForm.get('primaryScreens').value * this.digitalIfeForm.get('primaryPrice').value +
        this.digitalIfeForm.get('secondaryScreens').value * this.digitalIfeForm.get('secondaryPrice').value +
        itemTotal;
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
