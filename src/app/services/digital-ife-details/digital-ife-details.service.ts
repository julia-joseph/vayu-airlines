import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigitalIfeDetailsService {
  totalPrice: number = 12.78;
  totalQuantity: number = 3;
  submitted: boolean = false;
  
  digitalIfeDetails = {
    primaryPackageType: 'Premium',
    primaryScreens: 2,
    primaryPrice: 5.24,
    primarySubscription: false,
    secondaryPackageType: 'Kids Play',
    secondaryScreens: 1,
    secondaryPrice: 2.30,
    secondarySubscription: false,
    segment: 'JFK - BOS',
    additionalItems: []
  }

  totalPriceChange: Subject<number> = new Subject<number>();
  public totalPriceObservable = this.totalPriceChange.asObservable();

  totalQuantityChange: Subject<number> = new Subject<number>();
  public totalQuantityObservable = this.totalQuantityChange.asObservable();

  showPaymentChange: Subject<boolean> = new Subject<boolean>();
  public showPayementObservable = this.showPaymentChange.asObservable();

  performConfirmSubject: Subject<any> = new Subject<any>();
  public performConfirmObservable = this.performConfirmSubject.asObservable();

  performEditSubject: Subject<boolean> = new Subject<boolean>();
  public performEditObservable = this.performEditSubject.asObservable();

  performSkipSubject: Subject<boolean> = new Subject<boolean>();
  public performSkipObservable = this.performSkipSubject.asObservable();

  constructor() {
   }

  getDigitalIfeDetails() {
    return this.digitalIfeDetails;
  }

  setDigitalIfeDetails(digitalIfe: any){
    this.digitalIfeDetails = digitalIfe;
  }

  setTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice;
    this.totalPriceChange.next(totalPrice);
  }

  setTotalQuantity(totalQuantity: number) {
    this.totalQuantity = totalQuantity;
    this.totalQuantityChange.next(totalQuantity);
  }

  setShowPayment(state: boolean) {
    this.showPaymentChange.next(state);
  }

  setConfirmMiniViewDigitalIFE(digitalIFE) {
    this.performConfirmSubject.next(digitalIFE);
  }

  setEditMiniViewDigitalIFE() {
    this.performEditSubject.next();
  }

  setSkipMiniViewDigitalIFE() {
    this.performSkipSubject.next();
  }
}
