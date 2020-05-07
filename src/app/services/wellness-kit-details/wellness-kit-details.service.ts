import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WellnessKitDetailsService {
   wellnessKitDetails = {
     maskQuantity: 0,
     maskPrice: 5.24,
     maskSize: 'Adult/M',
     sanitizerQuantity: 0,
     sanitizerPrice: 2.30,
     sanitizerSize: '1 OZ (30 mL)',
     glovesQuantity: 0,
     glovesPrice: 1.20,
     glovesSize: 'Adult/M',
     delivery: 'Gate',
     segment: 'JFK - BOS'
   }

  constructor() {}

  getWellnessKitDetails() {
    return this.wellnessKitDetails;
  }

  setWellnessKitDetails(kit: any) {
    this.wellnessKitDetails = kit;
  }
}
