import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails : any = {
    firstName: 'Annie',
    lastName: '',
    email: 'annie@gmail.com'
  }

  constructor() { }

  setFirstName(name: string): void {
    this.userDetails.firstName = name;
  }

  getFirstName(): string {
    return this.userDetails.firstName;
  }

  setEmail(email: string): void {
    this.userDetails.email = email;
  }

  getEmail(): string {
    return this.userDetails.email;
  }
}
