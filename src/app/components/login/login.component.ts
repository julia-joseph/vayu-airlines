import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { MOCK_WELLNESS_SUB, MOCK_DIGITAL_SUB, MOCK_ADJ_SEAT_SUB } from 'src/app/consts/subscription.consts';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private flightDetailsService: FlightDetailsService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      if(this.loginForm.get('email').value === 'annie@gmail.com'){
        this.flightDetailsService.setFirstBooking();
        this.subscriptionService.setWellnessKitSubscription(MOCK_WELLNESS_SUB);
        this.subscriptionService.setDigitalIfeSubscription(MOCK_DIGITAL_SUB);
        this.subscriptionService.setAdjacentSeatSubscription(MOCK_ADJ_SEAT_SUB);
      }
      this.router.navigate(['/flight-search']);
    }

  }

}
