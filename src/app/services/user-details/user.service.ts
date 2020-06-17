import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails : any = {
    firstName: 'Annie',
    lastName: ''
  }

  constructor() { }

  setFirstName(name: string): void {
    this.userDetails.firstName = name;
  }

  getFirstName(): string {
    return this.userDetails.firstName;
  }

}
