import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TravellerService } from 'src/app/services/traveller--details/traveller.service';

@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.scss']
})
export class TravellerDetailsComponent implements OnInit {

  travellerForm = new FormGroup({
    travellerType : new FormControl('Adult', Validators.required),
    title: new FormControl('Mr'),
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    middleName : new FormControl(''),
    suffix : new FormControl(''),
    gender : new FormControl(false, Validators.required),
    dob : new FormControl('', Validators.required),
    iisNumber : new FormControl('', [ Validators.required, Validators.minLength(15), , Validators.maxLength(15) ]),
    iisStatus: new FormControl(false)
  });

  submitted: boolean = false;
  isValidating: boolean = false;

  constructor(
    private travellerService: TravellerService
  ) { }

  ngOnInit(): void {
    
  }

  onValidate() {
    this.isValidating = true;
    this.travellerService.getIisValidity().subscribe((valid) => {
      this.isValidating = false;
      if(valid){
        this.travellerForm.patchValue({
          iisStatus: true
        })
      }
      else {
        this.travellerForm.patchValue({
          iisStatus: false
        })
      }
    },
    error => {
      console.log('fail');
      this.travellerForm.patchValue({
        iisStatus: false
      })
    })
  }

  onSave() {
    this.submitted = true;
    console.log('trav',this.travellerForm.value)
    this.travellerService.setTravellerDetails(this.travellerForm.value);
  }

  onEdit() {
    this.submitted = false;
  }

  onContinue() {
    //close tab and go to next one
  }

}
