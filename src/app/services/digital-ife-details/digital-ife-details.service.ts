import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DigitalIfeDetailsService {
  totalPrice: number = 0.00;
  totalQuantity: number = 1;
  submitted: boolean = false;
  digitalIfeForm: FormGroup;
  
  digitalIfeDetails = {
    items: [
      {
        packageType: 'Basic',
        screens: 1,
        price: 0.00,
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      },
      {
        packageType: 'Kids Play',
        screens: 0,
        price: 1.00,
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      },
    ],
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

  setDigitalIfeFormGroup(form) {
    this.digitalIfeForm = form;
  }

  getDigitalIfeFormGroup() {
    return this.digitalIfeForm;
  }
}
