import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdjacentSeatDetailsService } from 'src/app/services/adjacent-seat-details/adjacent-seat-details.service';
import { ExpandedAncillariesDialogComponent } from '../expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FlightDetailsService } from 'src/app/services/flight-details/flight-details.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-adjacent-seat',
  templateUrl: './adjacent-seat.component.html',
  styleUrls: ['./adjacent-seat.component.scss']
})
export class AdjacentSeatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fromCode: string = 'JFK';
  @Input() toCode: string = 'BOS';
  @Input() travellerDetails: any = null;
  @Output() onSubmit = new EventEmitter<void>();

  submitted: boolean = false;

  adjacentSeatForm: FormGroup = new FormGroup({
    seats: new FormControl(1),
    price: new FormControl(65.32),
    subscription: new FormControl(false),
    // self:  new FormControl(false),
    // pone:  new FormControl(false),
    // ptwo:  new FormControl(false),
    segment: new FormControl('JFK - BOS')
  })
  adjacentSub;
  // applySubForm: FormGroup = new FormGroup({
  //   self: new FormControl(false),
  //   pone: new FormControl(false),
  //   ptwo: new FormControl(false)
  // });

  segment: string = 'JFK - BOS';
  segmentOptions: string[] = ['JFK - BOS'];

  seatOptions: number[] = [0, 1, 2];

  totalPrice: number = 65.32;
  totalQuantity: number = 1;

  formValueChangesSubscription: Subscription;
  performConfirmSubscription: Subscription;
  performEditSubscription: Subscription;
  performSkipSubscription: Subscription;

  isFirstBooking: boolean = false;
  isSubscriptionAdded: boolean = false;

  isSubscriptionAvailable: boolean = false;

  subscriptionName: string = "Annie";

  constructor(
    public dialog: MatDialog,
    private adjacentSeatService: AdjacentSeatDetailsService,
    private flightService: FlightDetailsService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.isFirstBooking = this.flightService.isFirstBooking();
    this.adjacentSub = this.subscriptionService.getAdjacentSeatSubscription();
    this.setInitialItems();

    this.segment = this.fromCode + ' - ' + this.toCode;
    this.segmentOptions = [this.segment];

    this.adjacentSeatService.setAdjacentSeatFormGroup(this.adjacentSeatForm);
    // this.adjacentSeatService.setAdjacentApplySubFormGroup(this.applySubForm);
    this.calculateTotalPrice();
    this.formValueChangesSubscription = this.adjacentSeatForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });

    this.performConfirmSubscription = this.adjacentSeatService.performConfirmObservable.subscribe(adjacentSeat => {
      this.adjacentSeatForm.setValue({
        ...adjacentSeat
      })
      this.onConfirm();
    })

    this.performEditSubscription = this.adjacentSeatService.performEditObservable.subscribe(() => {
      this.onEdit();
    })

    this.performSkipSubscription = this.adjacentSeatService.performSkipObservable.subscribe(() => {
      this.onSkip();
    })

    this.adjacentSeatService.performSubscriptionAddedObservable.subscribe(() => {
      this.checkSubscriptionAdded();
    })

    if(this.travellerDetails) {
      this.subscriptionName = this.travellerDetails.firstName[0].toUpperCase() + this.travellerDetails.lastName[0].toUpperCase();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.travellerDetails.currentValue && (!changes.travellerDetails.previousValue || 
      ((changes.travellerDetails.previousValue.firstName !== changes.travellerDetails.currentValue.firstName)
      || (changes.travellerDetails.previousValue.lastName !== changes.travellerDetails.currentValue.lastName))
      )) {
      if(this.travellerDetails) {
        this.subscriptionName = this.travellerDetails.firstName[0].toUpperCase() + this.travellerDetails.lastName[0].toUpperCase();
      }
    }
  }

  calculateTotalPrice() {
    this.totalPrice =  this.adjacentSeatForm.get('seats').value * this.adjacentSeatForm.get('price').value;
  }

  setInitialItems() {
    if(!this.isFirstBooking) {
      if(this.adjacentSub) {
        this.isSubscriptionAvailable = true;
        this.adjacentSeatForm.patchValue({
          seats: this.adjacentSub.seats,
          subscription: true,
        });
      }
    }
  }

  openDetails() {

  }

  onCancel() {

  }

  setAjacentSeatDetails() {
    this.adjacentSeatService.setTotalPrice(this.totalPrice);
    this.adjacentSeatService.setTotalQuantity(this.totalQuantity);
    this.adjacentSeatService.setAdjacentSeatDetails({
      ...this.adjacentSeatForm.value
    });

    this.submitted = true;
    this.adjacentSeatService.submitted = this.submitted;
  }

  onConfirm() {
    this.totalQuantity = this.adjacentSeatForm.get('seats').value;
    this.setAjacentSeatDetails();
    this.onSubmit.emit();
  }

  onSkip() {
    if(!this.submitted){
      this.totalQuantity = 0;
      this.adjacentSeatForm.patchValue({
        seats: 0,
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      })
      this.setAjacentSeatDetails();
    }

    this.adjacentSeatService.setShowPayment(true);
  }

  onEdit() {
    this.submitted = false;
    this.adjacentSeatService.submitted = this.submitted;
    this.adjacentSeatService.setShowPayment(false);
  }

  openExpandedAncDialog() {
    const dialogRef = this.dialog.open(ExpandedAncillariesDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '170vh',
      data: {
        wellnessKitForm: null,
        wellnessKitTotalPrice: null,
        digitalIfeForm: null,
        digitalIfeTotalPrice: null,
        adjacentSeatForm: this.adjacentSeatForm,
        adjacentSeatTotalPrice: this.totalPrice,
        selectedTab: 2,
        subscriptionName: this.subscriptionName
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result.confirmed) {
    //     this.adjacentSeatForm.setValue({
    //       ...result.adjacentSeatForm.value
    //     });
    //     this.onConfirm()
    //   }
    //   else {
    //     this.adjacentSeatForm.setValue({
    //       ...result.adjacentSeatForm.value
    //     });
    //   }
    // });
  }

  ngOnDestroy() {
    this.formValueChangesSubscription.unsubscribe();
    this.performConfirmSubscription.unsubscribe();
    this.performEditSubscription.unsubscribe();
    this.performSkipSubscription.unsubscribe();
  }

  checkSubscriptionAdded() {
    //check if any checkboxes are chosen. If yes, make the boolean true. For now its just set to true
    this.isSubscriptionAdded = true;
    this.adjacentSeatService.setSubscriptionAdded(this.isSubscriptionAdded);
  }
}
