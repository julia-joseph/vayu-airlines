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
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    iisNumber : new FormControl('', Validators.required),
  });

  submitted: boolean = false;

  constructor(
    private travellerService: TravellerService
  ) { }

  ngOnInit(): void {
    
  }

  onSave() {
    this.submitted = true;
    this.travellerService.setTravellerDetails(this.travellerForm.value);
  }

  onEdit() {
    this.submitted = false;
  }

  onContinue() {
    //close tab and go to next one
  }

}
