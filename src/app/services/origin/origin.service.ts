import { Injectable } from '@angular/core';
import { ORIGIN_DATA_RESPONSE } from './origin.response.mock';


@Injectable({
  providedIn: 'root'
})
export class OriginService {

  constructor() { }

  getOrigins() {
    return ORIGIN_DATA_RESPONSE;
  }
}



