import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HsmApiService } from '../services/hsm-api.service';
import { Item } from '../class/item';
import { Order } from '../class/order';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item;
  sellOrders: Order[];
  buyOrders: Order[];
  constructor(private route: ActivatedRoute, private hsmapi: HsmApiService) { }

  ngOnInit(): void {
    this.buyOrders = [];
    this.sellOrders = [];
    this.item = new Item();
    this.route.params.subscribe(params => {
      const item = params.item;
      this.hsmapi.getItem(item).subscribe(data => {
        this.item.name = data.body.name;
        this.item.description = data.body.description;
      });
      this.hsmapi.getItemOrders(item).subscribe(data => {
        let order = new Order();
        let i = 0;
        for (i = 0; i < data.body.buy.length; i++)
        {
          order.id = data.body.buy[i].id;
          order.buyOrSell = data.body.buy[i].buyOrSell;
          order.item = data.body.buy[i].item;
          order.price = data.body.buy[i].price;
          order.quantity = data.body.buy[i].quantity;
          order.user = data.body.buy[i].user;
          this.buyOrders.push(order);
          order = new Order();
        }
        for (i = 0; i < data.body.sell.length; i++)
        {
          order.id = data.body.sell[i].id;
          order.buyOrSell = data.body.sell[i].buyOrSell;
          order.item = data.body.sell[i].item;
          order.price = data.body.sell[i].price;
          order.quantity = data.body.sell[i].quantity;
          order.user = data.body.sell[i].user;
          this.sellOrders.push(order);
          order = new Order();
        }
      });
    });

  }

}
