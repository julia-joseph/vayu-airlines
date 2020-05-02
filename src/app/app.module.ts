import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }          from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchModule } from './components/flight-search/flight-search.module';
import { MainModule } from './components/main/main.module';
import { MainComponent } from './components/main/main.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MainModule,
    FlightSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
