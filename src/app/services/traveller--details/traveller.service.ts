import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravellerService {
  travellerDetails = {
    firstName: '',
    lastName: '',
    iisNumber: ''
  }

  travellerDetailsSubject: Subject<any> = new Subject<any>();

  constructor() { }

  setTravellerDetails(details) {
    this.travellerDetails = details;
    this.travellerDetailsSubject.next(this.travellerDetails);
  }

  getTravellerDetailsPObservable() {
    return this.travellerDetailsSubject.asObservable();
  }
}
