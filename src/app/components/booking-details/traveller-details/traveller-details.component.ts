import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TravellerService } from 'src/app/services/traveller--details/traveller.service';

@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.scss']
})
export class TravellerDetailsComponent implements OnInit {
  @Output() onTDContinue = new EventEmitter<void>();

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
    iisStatus: new FormControl('', Validators.required)
  });

  submitted: boolean = false;
  isValidating: boolean = false;
  error: boolean = false;

  constructor(
    private travellerService: TravellerService
  ) { }

  ngOnInit(): void {
    
  }

  onValidate() {
    this.isValidating = true;
    
    this.travellerService.postTravellerDetails({
      dob: this.travellerForm.get('dob').value,
      gender: this.travellerForm.get('gender').value ? 'Female' : 'Male',
      iis: this.travellerForm.get('iisNumber').value,
      paxFirstName: this.travellerForm.get('firstName').value,
      paxLastName: this.travellerForm.get('lastName').value
    })
    .subscribe((data) => {
      const valid = data.iisStatus;
      this.error = false;
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
    (error) => {
      console.log('fail');
      this.isValidating = false;
      this.error = true;
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
    console.log('continuebtn')
    this.onTDContinue.emit();
  }

}
