import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchModule } from './components/flight-search/flight-search.module';
import { MainModule } from './components/main/main.module';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';
import { AncillariesComponent } from './components/ancillaries/ancillaries.component';
import { FlightListModule } from './components/flight-list/flight-list.module';
import { ItineraryConfirmationComponent } from './components/itinerary-confirmation/itinerary-confirmation.component';
import { RegulationsDialogComponent } from './components/regulations-dialog/regulations-dialog.component';
import { ExpandedAncillariesDialogComponent } from './components/ancillaries/expanded-ancillaries-dialog/expanded-ancillaries-dialog.component';
import { WellnessKitComponent } from './components/ancillaries/wellness-kit/wellness-kit.component';
import { DigitalIFEComponent } from './components/ancillaries/digital-ife/digital-ife.component';
import { AdjacentSeatComponent } from './components/ancillaries/adjacent-seat/adjacent-seat.component';
import { ExpandedWellnessKitComponent } from './components/ancillaries/expanded-ancillaries-dialog/expanded-wellness-kit/expanded-wellness-kit.component';
import { ExpandedDigitalIFEComponent } from './components/ancillaries/expanded-ancillaries-dialog/expanded-digital-ife/expanded-digital-ife.component';
import { ExpandedAdjacentSeatComponent } from './components/ancillaries/expanded-ancillaries-dialog/expanded-adjacent-seat/expanded-adjacent-seat.component';
import { DonationsComponent } from './components/donations/donations.component';
import { RecentEventsComponent } from './components/donations/recent-events/recent-events.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { WellnessSubscriptionComponent } from './components/subscriptions/wellness-subscription/wellness-subscription.component';
import { DigitalSubscriptionComponent } from './components/subscriptions/digital-subscription/digital-subscription.component';
import { AdjacentSubscriptionComponent } from './components/subscriptions/adjacent-subscription/adjacent-subscription.component';
import { WellnessDonationComponent } from './components/donations/wellness-donation/wellness-donation.component';
import { ReliefFundsComponent } from './components/donations/relief-funds/relief-funds.component';
import { PaymentDonationComponent } from './components/donations/payment-donation/payment-donation.component';
import { DonationDialogComponent } from './components/donation-dialog/donation-dialog.component';
import { CertificateDialogComponent } from './components/donations/certificate-dialog/certificate-dialog.component';
import { TravellerDetailsComponent } from './components/booking-details/traveller-details/traveller-details.component';
import { TravellerChecklistDialogComponent } from './components/booking-details/traveller-details/traveller-checklist-dialog/traveller-checklist-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingDetailsComponent,
    PaymentSummaryComponent,
    AncillariesComponent,
    ItineraryConfirmationComponent,
    RegulationsDialogComponent,
    ExpandedAncillariesDialogComponent,
    WellnessKitComponent,
    DigitalIFEComponent,
    AdjacentSeatComponent,
    ExpandedWellnessKitComponent,
    ExpandedDigitalIFEComponent,
    ExpandedAdjacentSeatComponent,
    DonationsComponent,
    RecentEventsComponent,
    SubscriptionsComponent,
    WellnessSubscriptionComponent,
    DigitalSubscriptionComponent,
    AdjacentSubscriptionComponent,
    WellnessDonationComponent,
    ReliefFundsComponent,
    PaymentDonationComponent,
    DonationDialogComponent,
    CertificateDialogComponent,
    TravellerDetailsComponent,
    TravellerChecklistDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainModule,
    FlightSearchModule,
    BrowserAnimationsModule,
    FlightListModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  entryComponents: [
    RegulationsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
