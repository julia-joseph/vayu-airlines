import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adjacent-subscription',
  templateUrl: './adjacent-subscription.component.html',
  styleUrls: ['./adjacent-subscription.component.scss']
})
export class AdjacentSubscriptionComponent implements OnInit {
  @Input() adjacentSub;
  @Output() onASConfirm = new EventEmitter<any>();

  adjacentSubForm: FormGroup = new FormGroup({
    seats: new FormControl(1),
    price: new FormControl(65.32),
    subscription: new FormControl(true)
  })

  submitted: boolean = false;

  seatOptions: number[] = [0, 1, 2];

  cancelledItem: boolean = false;
  show: boolean = false;
  removeIcon: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setInitialItems();
  }

  setInitialItems() {
    if(this.adjacentSub){
      this.show = true;
      this.adjacentSubForm.setValue({
        seats: this.adjacentSub.seats,
        price: this.adjacentSub.price,
        subscription: this.adjacentSub.subscription
      })
    }
  }

  addItem() {
    this.show = true;
    this.removeIcon = true;
  }

  cancelSub() {
    this.cancelledItem = true;
    this.adjacentSubForm.patchValue({
      subscription: false
    })
  }

  reinstateSub() {
    this.cancelledItem = false;
    this.adjacentSubForm.patchValue({
      subscription: true
    })
  }

  onEdit() {
    this.submitted = false;
  }

  onConfirm() {
    this.submitted = true;
    if(this.show) {
      if(!this.cancelledItem && this.adjacentSubForm.get('subscription').value){
        this.onASConfirm.emit(this.adjacentSubForm.value);
      }
      else {
        this.onASConfirm.emit(null);
      }
    }
  }

  onSkip() {
    this.router.navigate(['/flight-search']);
  }
}
