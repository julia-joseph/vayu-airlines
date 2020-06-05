import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-relief-funds',
  templateUrl: './relief-funds.component.html',
  styleUrls: ['./relief-funds.component.scss']
})
export class ReliefFundsComponent implements OnInit {
  donationForm: FormGroup = new FormGroup({
    price: new FormControl(1000),
    support: new FormControl(0),
    frequency: new FormControl(0),
    dedicate: new FormControl(false)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
