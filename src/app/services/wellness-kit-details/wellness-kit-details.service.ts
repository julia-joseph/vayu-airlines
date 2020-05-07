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
    maskSize: 'Adult',
    sanitizerQuantity: 0,
    sanitizerPrice: 2.3,
    sanitizerSize: '1 Oz',
    glovesQuantity: 0,
    glovesPrice: 1.2,
    glovesSize: 'Adult',
    delivery: 'Gate',
    segment: 'NYC - LAX',
    totalPrice: 8.24,
    totalKitQty: 6,
  };

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
