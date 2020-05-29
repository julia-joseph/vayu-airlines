import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjacentSeatDetailsService {
  totalPrice: number = 130.64;
  totalQuantity: number = 2;
  showPayment: boolean  = false;
  submitted: boolean = false;
  
  adjacentSeatDetails = {
    seats: 2,
    price: 65.32,
    subscription: false,
    segment: 'JFK - BOS'
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

  constructor() { }

  getAdjacentSeatDetails() {
    return this.adjacentSeatDetails;
  }

  setAdjacentSeatDetails(adjacentSeats: any) {
    this.adjacentSeatDetails = adjacentSeats;
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
    this.showPayment = state;
    this.showPaymentChange.next(state);
  }

  setConfirmMiniViewAdjacentSeat(adjacentSeat) {
    this.performConfirmSubject.next(adjacentSeat);
  }

  setEditMiniViewAdjacentSeat() {
    this.performEditSubject.next();
  }

  setSkipMiniViewAdjacentSeat() {
    this.performSkipSubject.next();
  }
}
