import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { LoginComponent } from './components/login/login.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { ItineraryConfirmationComponent } from './components/itinerary-confirmation/itinerary-confirmation.component';
import { DonationsComponent } from './components/donations/donations.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: 'booking-details', component: BookingDetailsComponent},
  { path: 'itinerary-confirmation', component: ItineraryConfirmationComponent},
  { path: 'donations', component: DonationsComponent},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
