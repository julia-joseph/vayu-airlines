import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [MainComponent, NavbarComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    MainComponent, NavbarComponent, HeaderComponent, FooterComponent, MatMenuModule
  ]
})
export class MainModule { }
