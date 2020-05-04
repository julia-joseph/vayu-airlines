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

  getOriginName(code) {
    const origin = ORIGIN_DATA_RESPONSE.data.origins.find(origin => origin.code === code);
    return origin ? origin.name : '';
  }
}



