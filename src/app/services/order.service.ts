import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = [];

  constructor() { }

  createOrder(order)
  {
    this.orders = [order, ...this.orders];
    console.log(this.orders);
  }
}
