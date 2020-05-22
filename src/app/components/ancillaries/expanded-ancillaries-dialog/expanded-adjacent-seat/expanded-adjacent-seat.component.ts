import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expanded-adjacent-seat',
  templateUrl: './expanded-adjacent-seat.component.html',
  styleUrls: ['./expanded-adjacent-seat.component.scss']
})
export class ExpandedAdjacentSeatComponent implements OnInit {
  @Input() adjacentSeatForm: FormGroup;
  @Input() totalPrice = 130.64;
  @Output() onSRConfirm = new EventEmitter<void>();

  submitted: boolean = false;

  segment: string = 'JFK - BOS';
  segmentOptions: string[] = ['JFK - BOS'];

  seatOptions: number[] = [0, 1, 2];

  totalQuantity: number = 2;

  constructor() { }

  ngOnInit(): void {
    this.adjacentSeatForm.valueChanges.subscribe(() => {
      console.log('form',this.adjacentSeatForm.value);
      this.totalPrice =  this.adjacentSeatForm.get('seats').value * this.adjacentSeatForm.get('price').value;
    });
  }

  openDetails() {

  }

  onConfirm() {
    //maybe obs
    this.submitted = true;
    this.onSRConfirm.emit();
  }

  // onEdit() {
  //   this.submitted = false;
  // }
}
