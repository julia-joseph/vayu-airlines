import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';

@Component({
  selector: 'app-adjacent-seat',
  templateUrl: './adjacent-seat.component.html',
  styleUrls: ['./adjacent-seat.component.scss']
})
export class AdjacentSeatComponent implements OnInit {
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Output() onSubmit = new EventEmitter<void>();

  submitted: boolean = false;

  adjacentSeatForm: FormGroup = new FormGroup({
    seats: new FormControl(2),
    price: new FormControl(65.32),
    subscription: new FormControl(false),
    segment: new FormControl('JFK - BOS')
  })

  segment: string = 'JFK - BOS';
  segmentOptions: string[] = ['JFK - BOS'];

  seatOptions: number[] = [0, 1, 2];

  totalPrice: number = 130.64;
  totalQuantity: number = 2;

  constructor(
    private adjacentSeatService: AdjacentSeatDetailsService
  ) { }

  ngOnInit(): void {
    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.adjacentSeatForm.valueChanges.subscribe(() => {
      console.log('form',this.adjacentSeatForm.value);
      this.totalPrice =  this.adjacentSeatForm.get('seats').value * this.adjacentSeatForm.get('price').value;
    });
  }

  openDetails() {

  }

  onCancel() {

  }

  onConfirm() {
    this.totalQuantity = this.adjacentSeatForm.get('seats').value;
    this.adjacentSeatService.setTotalPrice(this.totalPrice);
    this.adjacentSeatService.setTotalQuantity(this.totalQuantity);
    this.adjacentSeatService.setAdjacentSeatDetails({
      ...this.adjacentSeatForm.value
    });

    this.submitted = true;
    
    this.onSubmit.emit();
  }

  onSkip() { 
    this.adjacentSeatService.setShowPayment(true);
  }

  onEdit() {
    this.submitted = false;
    this.adjacentSeatService.setShowPayment(false);
  }
}
