import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relief-funds',
  templateUrl: './relief-funds.component.html',
  styleUrls: ['./relief-funds.component.scss']
})
export class ReliefFundsComponent implements OnInit {
  @Output() onRFSkip = new EventEmitter<void>();
  removeActive: boolean = false;

  donationForm: FormGroup = new FormGroup({
    donation: new FormControl(1000, Validators.min(10)),
    support: new FormControl(0),
    frequency: new FormControl(0),
    dedicate: new FormControl(false),
    name: new FormControl('')
  });

  submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.donationForm.valueChanges.subscribe(() => {
      console.log('donationForm',this.donationForm.controls.donation);
    })
  }

  onConfirm() {
    this.submitted = true;
  }

  onEdit() {
    this.submitted = false;
  }

  onSkip() {
    this.onRFSkip.emit();
  }
}
