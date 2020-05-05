import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WellnessKitDetailsService {
   wellnessKitDetails = {
     maskQuantity: 0,
     maskPrice: 5.24,
     sanitizerQuantity: 0,
     sanitizerPrice: 2.30,
     glovesQuantity: 0,
     glovesPrice: 1.20,
     delivery: 'Gate'
   }

  constructor() { }

  getWellnessKitDetails() {
    return this.wellnessKitDetails;
  }

  setWellnessKitDetails(kit: any) {
    this.wellnessKitDetails = kit;
  }
}
