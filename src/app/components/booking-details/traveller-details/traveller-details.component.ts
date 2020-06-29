import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TravellerService } from 'src/app/services/traveller--details/traveller.service';
import { MatDialog } from '@angular/material/dialog';
import { TravellerChecklistDialogComponent } from './traveller-checklist-dialog/traveller-checklist-dialog.component';

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
    iisNumber : new FormControl('', [ Validators.required, Validators.minLength(9), , Validators.maxLength(9) ]),
    iisStatus: new FormControl('', Validators.required)
  });

  optionsForm = new FormGroup({
    option: new FormControl(true)
  });

  submitted: boolean = false;
  isValidating: boolean = false;
  error: boolean = false;

  constructor(
    private travellerService: TravellerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.optionsForm.valueChanges.subscribe(() => {
      if(!this.optionsForm.get('option').value) {
        this.openChecklistDialog();
      }
    })
  }

  onValidate() {
    this.isValidating = true;
    const iisNumber = this.travellerForm.get('iisNumber').value;

    setTimeout(()=> {
      this.isValidating = false;
      if(iisNumber === 'V83724912' || iisNumber === 'A15798243'){
        this.travellerForm.patchValue({
          iisStatus: true
        })
      }
      else {
        this.travellerForm.patchValue({
          iisStatus: false
        })
      }
    },1500)
    
    // this.travellerService.postTravellerDetails({
    //   dob: this.travellerForm.get('dob').value,
    //   gender: this.travellerForm.get('gender').value ? 'Female' : 'Male',
    //   iis: this.travellerForm.get('iisNumber').value,
    //   paxFirstName: this.travellerForm.get('firstName').value,
    //   paxLastName: this.travellerForm.get('lastName').value
    // })
    // .subscribe((data) => {
    //   const valid = data.iisStatus;
    //   this.error = false;
    //   this.isValidating = false;
    //   if(valid){
    //     this.travellerForm.patchValue({
    //       iisStatus: true
    //     })
    //   }
    //   else {
    //     this.travellerForm.patchValue({
    //       iisStatus: false
    //     })
    //   }
    // }, 
    // (error) => {
    //   console.log('fail');
    //   this.isValidating = false;
    //   this.error = true;
    //   this.travellerForm.patchValue({
    //     iisStatus: false
    //   })
    // })
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

  openChecklistDialog() {
    const dialogRef = this.dialog.open(TravellerChecklistDialogComponent, {
      width: '735px',
      data: { }
    });
  }
}
