import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  constructor(private orderservice: OrderService) { }

  ngOnInit(): void {
  }

  addOrder(form)
  {
    this.orderservice.createOrder(form.value);
  }
}
