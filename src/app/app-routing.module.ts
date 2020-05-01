import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';


const routes: Routes = [
  { path: 'flight-search', component: FlightSearchComponent },
  { path: '',   redirectTo: '/flight-search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
