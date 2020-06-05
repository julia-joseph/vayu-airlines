import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-wellness-subscription',
  templateUrl: './wellness-subscription.component.html',
  styleUrls: ['./wellness-subscription.component.scss']
})
export class WellnessSubscriptionComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  disableScrollDown = false

  @Input() wellnessSub;
  @Output() onWSConfirm = new EventEmitter<any>();
  @Output() onSkipToDS = new EventEmitter<void>();
  
  wellnessSubForm: FormGroup = new FormGroup({
    items: new FormArray([ ]),
    additionalItems: new FormArray([ ])
  });

  submitted: boolean = false;
  isNewItemsAdded: boolean = false;

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

  constructor() { }

  ngOnInit(): void {
    this.setInitialItems();
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

  get items() {
    return this.wellnessSubForm.get('items') as FormArray;
  }

  setInitialItems() {
    // this.items.push(this.addItemAsFormGroup('Mask',1,'Adult/M',5.24));
    // this.items.push(this.addItemAsFormGroup('Sanitizer',1,'1 OZ (30 mL)',2.3));
    // this.items.push(this.addItemAsFormGroup('Gloves',1,'Adult/M',1.2));
    // this.items.push(this.addItemAsFormGroup('Boxed Meal',1,'Adult/Veg Sandwich',20));
    if(this.wellnessSub.length){
      this.wellnessSub.forEach((item) => {
        this.items.push(this.addItemAsFormGroup(item.item,item.quantity,item.size,item.price,item.subscription,item.self,item.pone,item.ptwo));
      })
    }
  }

  addItemAsFormGroup(item: string, quantity: number, size: string, price: number, 
        sub: boolean = true, self: boolean = false, pone: boolean = false, ptwo: boolean = false) {
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
    return this.wellnessSubForm.get('additionalItems') as FormArray;
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
    //if all three checkboxes are false, remove sub
    this.filterEmptySubItems(this.items);
    this.filterEmptySubItems(this.additionalItems);

    console.log('items',this.wellnessSub.value);

    const finalItems = [...this.items.value, ...this.additionalItems.value];
    this.onWSConfirm.emit(finalItems)
  }

  onEdit() {
    this.submitted = false;
  }

  onSkipToDigitalIFE() {
    this.onSkipToDS.emit();
  }
}
