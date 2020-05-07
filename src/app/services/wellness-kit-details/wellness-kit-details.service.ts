import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WellnessKitDetailsService {
  totalPrice: Number;
  totalKitQty: Number;

  totalPriceChange: Subject<Number> = new Subject<Number>();
  public priceObs = this.totalPriceChange.asObservable();

  totalKitQtyChange: Subject<Number> = new Subject<Number>();
  public kitQtyObs = this.totalKitQtyChange.asObservable();

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

  constructor() {
    this.totalPriceChange.subscribe((value) => {
      this.totalPrice = value;
    });
    this.totalKitQtyChange.subscribe((value) => {
      this.totalKitQty = value;
    });
  }

  getWellnessKitDetails() {
    return this.wellnessKitDetails;
  }

  setWellnessKitDetails(kit: any) {
    this.wellnessKitDetails = kit;
  }

  setTotalPrice(totalPrice: any) {
    this.totalPriceChange.next(totalPrice);
  }

  settotalKitQty(totalKitQty: any) {
    this.totalKitQtyChange.next(totalKitQty);
  }
}
