import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adjacent-subscription',
  templateUrl: './adjacent-subscription.component.html',
  styleUrls: ['./adjacent-subscription.component.scss']
})
export class AdjacentSubscriptionComponent implements OnInit {
  @Input() adjacentSub;
  @Output() onASConfirm = new EventEmitter<any>();

  adjacentSubForm: FormGroup = new FormGroup({
    seats: new FormControl(0),
    price: new FormControl(65.32),
    subscription: new FormControl(false)
  })

  submitted: boolean = false;

  seatOptions: number[] = [0, 1, 2];

  constructor() { }

  ngOnInit(): void {
    this.setInitialItems();
  }

  setInitialItems() {
    if(this.adjacentSub){
      this.adjacentSubForm.setValue({
        seats: this.adjacentSub.seats,
        price: this.adjacentSub.price,
        subscription: this.adjacentSub.subscription
      })
    }
  }

  onEdit() {
    this.submitted = false;
  }

  onConfirm() {
    this.submitted = true;
    this.onASConfirm.emit(this.adjacentSubForm.value);
  }

}
