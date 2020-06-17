import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-details/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.firstName = this.userService.getFirstName();
  }

  redirect() {
    this.router.navigate(['/flight-search']);
  }

  onMySubscriptions() {
    this.router.navigate(['/subscriptions']);
  }

  onMyDonations() {
    this.router.navigate(['/donations']);
  }
}
