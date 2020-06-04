import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WellnessKitDetailsService {
  totalPrice: number = 28.74;
  totalKitQty: number;
  showPayment: boolean;
  submitted: boolean = false;
  wellnessKitForm: FormGroup;
  wellnessApplySubForm: FormGroup;

  totalPriceChange: Subject<number> = new Subject<number>();
  public priceObs = this.totalPriceChange.asObservable();

  totalKitQtyChange: Subject<number> = new Subject<number>();
  public kitQtyObs = this.totalKitQtyChange.asObservable();

  showPaymentChange: Subject<boolean> = new Subject<boolean>();
  public showPayementObs = this.showPaymentChange.asObservable();

  performConfirmSubject: Subject<any> = new Subject<any>();
  public performConfirmObservable = this.performConfirmSubject.asObservable();

  performEditSubject: Subject<boolean> = new Subject<boolean>();
  public performEditObservable = this.performEditSubject.asObservable();

  performSkipSubject: Subject<boolean> = new Subject<boolean>();
  public performSkipObservable = this.performSkipSubject.asObservable();

  wellnessKitDetails = {
    items: [
      {
        item: 'Mask',
        quantity: 1,
        price: 5.24,
        size: 'Adult/M',
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      },
      {
        item: 'Sanitizer',
        quantity: 1,
        price: 2.30,
        size: '1 OZ (30 mL)',
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      },
      {
        item: 'Gloves',
        quantity: 1,
        price: 1.20,
        size: 'Adult/M',
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      },
      {
        item: 'Boxed Meals',
        quantity: 1,
        price: 20,
        size: 'Adult/Veg Sandwich',
        subscription: false,
        self: false,
        pone: false,
        ptwo: false
      }
    ],
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

  setConfirmMiniViewWellnessKit(wellnessKit) {
    this.performConfirmSubject.next(wellnessKit);
  }

  setEditMiniViewWellnessKit() {
    this.performEditSubject.next();
  }

  setSkipMiniViewWellnessKit() {
    this.performSkipSubject.next();
  }

  setWellnessKitFormGroup(form) {
    this.wellnessKitForm = form;
  }

  getWellnessKitFormGroup() {
    return this.wellnessKitForm;
  }

  setWellnessApplySubFormGroup(form) {
    this.wellnessApplySubForm = form;
  }

  getWellnessApplySubFormGroup() {
    return this.wellnessApplySubForm;
  }
}
