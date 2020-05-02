import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'flight-list', component: FlightListComponent },
  { path: 'login', component: LoginComponent },

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
