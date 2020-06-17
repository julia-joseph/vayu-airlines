import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-digital-subscription',
  templateUrl: './digital-subscription.component.html',
  styleUrls: ['./digital-subscription.component.scss']
})
export class DigitalSubscriptionComponent implements OnInit {
  @Input() digitalSub;
  @Output() onDSConfirm = new EventEmitter<any>();
  @Output() onSkipToAS = new EventEmitter<void>();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false;

  digitalSubForm: FormGroup = new FormGroup({
    items: new FormArray([ ]),
    additionalItems: new FormArray([ ])
  });
  submitted: boolean = false;

  packageTypeOptions: string[] = ['Basic', 'Premium', 'VIP', 'Kids Play'];
  screenOptions: number[] = [0, 1, 2];

  cancelledSubForm: FormGroup = new FormGroup({
    items: new FormArray([ ])
  });

  constructor() { }

  ngOnInit(): void {
    this.setInitialItems();
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
    return this.digitalSubForm.get('items') as FormArray;
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

  setInitialItems() {
    // this.items.push(this.addItemAsFormGroup('Mask',1,'Adult/M',5.24));
    // this.items.push(this.addItemAsFormGroup('Sanitizer',1,'1 OZ (30 mL)',2.3));
    // this.items.push(this.addItemAsFormGroup('Gloves',1,'Adult/M',1.2));
    // this.items.push(this.addItemAsFormGroup('Boxed Meal',1,'Adult/Veg Sandwich',3.5));
    if(this.digitalSub.length){
      this.digitalSub.forEach((item) => {
        this.items.push(this.addItemAsFormGroup(item.packageType,item.screens,item.price,item.subscription,item.self,item.pone,item.ptwo));
      })
    }
  }

  get additionalItems() {
    return this.digitalSubForm.get('additionalItems') as FormArray;
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

  openDetails() {

  }

  get cancelItems() {
    return this.cancelledSubForm.get('items') as FormArray;
  }

  removeItem(i: number): void { 
    this.cancelItems.push(new FormGroup({
      packageType: new FormControl(this.items.value[i].packageType),
      screens: new FormControl(this.items.value[i].screens),
      price: new FormControl(this.items.value[i].price),
      subscription: new FormControl(this.items.value[i].subscription),
      self: new FormControl(this.items.value[i].self),
      pone: new FormControl(this.items.value[i].pone),
      ptwo: new FormControl(this.items.value[i].ptwo)
    }));
    
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

  filterEmptySubItems(itemGroup) {
    const emptyItemSubIndexes = itemGroup.value.reduce(function(arr, item, index) {
      if (!item.self && !item.pone && !item.ptwo)
          arr.push(index);
      return arr;
    }, []);
    emptyItemSubIndexes.forEach((subIndex) => {
      itemGroup.removeAt(subIndex);
    })
  }

  onConfirm() {
    this.submitted = true;

    this.filterEmptySubItems(this.items);
    this.filterEmptySubItems(this.additionalItems);

    const finalItems = [...this.items.value, ...this.additionalItems.value];
    this.onDSConfirm.emit(finalItems);
  }

  onEdit() {
    this.submitted = false;
  }

  onSkipToSeatRegrouping() {
    this.onSkipToAS.emit();
  }
}
