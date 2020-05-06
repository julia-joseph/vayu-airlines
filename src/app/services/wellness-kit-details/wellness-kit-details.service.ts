import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WellnessKitDetailsService {
  wellnessKitDetails = {
    maskQuantity: 0,
    maskPrice: 5.24,
    sanitizerQuantity: 0,
    sanitizerPrice: 2.3,
    glovesQuantity: 0,
    glovesPrice: 1.2,
    delivery: 'Gate',
    segment: 'YYZ - LGA',
  };

  constructor() {}

  getWellnessKitDetails() {
    return this.wellnessKitDetails;
  }

  setWellnessKitDetails(kit: any) {
    this.wellnessKitDetails = kit;
  }
}
