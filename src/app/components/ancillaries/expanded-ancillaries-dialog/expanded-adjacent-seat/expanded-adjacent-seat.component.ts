import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';

@Component({
  selector: 'app-expanded-adjacent-seat',
  templateUrl: './expanded-adjacent-seat.component.html',
  styleUrls: ['./expanded-adjacent-seat.component.scss']
})
export class ExpandedAdjacentSeatComponent implements OnInit {
  @Input() isFirstBooking = true;
  @Input() adjacentSeatForm: FormGroup;
  @Input() totalPrice;
  @Output() onSRConfirm = new EventEmitter<void>();

  submitted: boolean = false;

  segment: string = 'JFK - BOS';
  segmentOptions: string[] = ['JFK - BOS'];

  seatOptions: number[] = [0, 1, 2];

  totalQuantity: number = 1;
  isSubscriptionAdded: boolean = false;

  // applySubForm: FormGroup;

  constructor(
    private adjacentSeatService: AdjacentSeatDetailsService
  ) { }

  ngOnInit(): void {
    // this.applySubForm = this.adjacentSeatService.getAdjacentApplySubFormGroup();
    this.isSubscriptionAdded = this.adjacentSeatService.getSubscriptionAdded();

    this.submitted = this.adjacentSeatService.submitted;
    this.calculateTotalPrice();
    this.adjacentSeatForm.valueChanges.subscribe(() => {
      console.log('form',this.adjacentSeatForm.value);
      this.calculateTotalPrice();
    });
  }

  openDetails() {

  }

  calculateTotalPrice() {
    this.totalPrice =  this.adjacentSeatForm.get('seats').value * this.adjacentSeatForm.get('price').value;
  }

  onConfirm() {
    this.submitted = true;
    this.adjacentSeatService.setConfirmMiniViewAdjacentSeat(this.adjacentSeatForm.value);
  }

  onEdit() {
    this.submitted = false;
    this.adjacentSeatService.setEditMiniViewAdjacentSeat();
  }

  onSkip() {
    this.adjacentSeatService.setSkipMiniViewAdjacentSeat();
    this.onSRConfirm.emit();
  }

  checkSubscriptionAdded() {
    this.isSubscriptionAdded = true;
    this.adjacentSeatService.setSubscriptionAddedMini();
  }
}
