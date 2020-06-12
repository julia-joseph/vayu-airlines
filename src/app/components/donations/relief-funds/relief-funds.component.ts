import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-relief-funds',
  templateUrl: './relief-funds.component.html',
  styleUrls: ['./relief-funds.component.scss']
})
export class ReliefFundsComponent implements OnInit {
  @Output() onRFSkip = new EventEmitter<void>();
  removeActive: boolean = false;

  donationForm: FormGroup = new FormGroup({
    donation: new FormControl(10, Validators.min(10)),
    support: new FormControl(1),
    frequency: new FormControl(0),
    dedicate: new FormControl(false),
    name: new FormControl('')
  });

  submitted: boolean = false;
  // selected = null;

  constructor() { }

  ngOnInit(): void {
    this.donationForm.valueChanges.subscribe(() => {
      console.log('donationForm',this.donationForm.value);
    })
  }

  // resetButtons() {
  //   this.selected = null;
  // }

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
