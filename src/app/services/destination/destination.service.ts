import { Injectable } from '@angular/core';
import { DESTINATIONS } from './destination.response.mock';


@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor() { }

  destination:any;
  getDestination(origin) {
    this.destination = DESTINATIONS.filter(
      destination => destination.data.origin === origin,
    );
    return this.destination[0];
}

  getDestinationName(code) {
    const destination = DESTINATIONS.find(destination => 
      destination.data.destinations.find(des => des.code === code )
    );
    const des = destination.data.destinations.find(des => des.code === code);
    return des ? des.name : '';
  }

}

