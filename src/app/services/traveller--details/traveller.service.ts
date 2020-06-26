import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TravellerService {
  travellerDetails = {
    travllerType: '',
    title: '',
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    gender: false,
    dob: '',
    iisNumber: '',
    iisStatus: ''
  }

  travellerDetailsSubject: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpService
  ) { }

  setTravellerDetails(details) {
    this.travellerDetails = details;
    this.travellerDetailsSubject.next(this.travellerDetails);
  }

  getTravellerDetailsPObservable() {
    return this.travellerDetailsSubject.asObservable();
  }

  postTravellerDetails(details) {
    // http://vayu-airlines.azurewebsites.net/v2/api-docs?group=Vayu airlines/covid/vayu/passenger/iis
    return this.http.post('/covid/vayu/passenger/iis',details);
  }
}
