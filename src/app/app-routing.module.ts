import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';


const routes: Routes = [
  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: '',   redirectTo: '/flight-search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
