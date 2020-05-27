import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WellnessKitDetailsService {
  totalPrice: number = 28.74;
  totalKitQty: number;
  showPayment: boolean;

  totalPriceChange: Subject<number> = new Subject<number>();
  public priceObs = this.totalPriceChange.asObservable();

  totalKitQtyChange: Subject<number> = new Subject<number>();
  public kitQtyObs = this.totalKitQtyChange.asObservable();

  showPaymentChange: Subject<boolean> = new Subject<boolean>();
  public showPayementObs = this.showPaymentChange.asObservable();

  performConfirmSubject: Subject<any> = new Subject<any>();
  public performConfirmObservable = this.performConfirmSubject.asObservable();

  wellnessKitDetails = {
    maskQuantity: 1,
    maskPrice: 5.24,
    maskSize: 'Adult/M',
    maskSubscription: false,
    sanitizerQuantity: 1,
    sanitizerPrice: 2.30,
    sanitizerSize: '1 OZ (30 mL)',
    sanitizerSubscription: false,
    glovesQuantity: 1,
    glovesPrice: 1.20,
    glovesSize: 'Adult/M',
    glovesSubscription: false,
    boxedMealVegQuantity: 1,
    boxedMealVegSize: 'Adult/Veg Sandwich',
    boxedMealVegPrice: 20,
    boxedMealVegSubscription: false,
    delivery: 'Gate',
    segment: 'JFK - BOS',
    additionalItems: []
  }

  constructor() {
    this.totalPriceChange.subscribe((value) => {
      this.totalPrice = value;
    });
    this.totalKitQtyChange.subscribe((value) => {
      this.totalKitQty = value;
    });

    this.showPaymentChange.subscribe((value) => {
      this.showPayment = value;
    });
  }

  getWellnessKitDetails() {
    return this.wellnessKitDetails;
  }

  setWellnessKitDetails(kit: any) {
    this.wellnessKitDetails = kit;
  }

  setTotalPrice(totalPrice: number) {
    this.totalPriceChange.next(totalPrice);
  }

  setTotalKitQty(totalKitQty: number) {
    this.totalKitQtyChange.next(totalKitQty);
  }

  setShowPayment(state: boolean) {
    this.showPaymentChange.next(state);
  }

  setMiniViewWellnessKit(wellnessKit) {
    //observable to push confirm button on main screen
    this.performConfirmSubject.next(wellnessKit);
  }
}
