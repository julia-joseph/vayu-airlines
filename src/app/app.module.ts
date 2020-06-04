import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    AdjacentSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatCheckboxModule
  ],
  entryComponents: [
    RegulationsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
