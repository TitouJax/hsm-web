import {Component, OnInit, ViewChild} from '@angular/core';
import {HsmApiService} from '../services/hsm-api.service';
import { Order } from '../class/order';
import {Item} from '../class/item';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  sameName: boolean;
  name: string;
  creationDate: Date;
  item: Item;
  sellOrders: Order[];
  buyOrders: Order[];
  dataSource1;
  dataSource2;
  displayedColumns1: string[] = [];
  displayedColumns2: string[] = [];
  constructor(private route: ActivatedRoute, private hsmapi: HsmApiService, private cookie: CookieService, private router: Router) { }

  @ViewChild('table1', {read: MatSort}) sort1: MatSort;
  @ViewChild('table2', {read: MatSort}) sort2: MatSort;
  ngOnInit(): void {
    this.sameName = false;
    this.buyOrders = [];
    this.sellOrders = [];
    this.route.params.subscribe(params => {
      this.hsmapi.getUserInfo(params.user).subscribe(data => {
        if (data.body.error) {
          console.log("Can't fetch user info");
        } else {
          this.name = data.body.user.name;
          const date = new Date(data.body.user.creationDate);
          this.creationDate = date;
          this.displayedColumns1 = ['item', 'quantity', 'price'];
          this.displayedColumns2 = ['price', 'quantity', 'item'];
          this.hsmapi.getUser().subscribe(data => {
            if (data.body.name === this.name) {
              this.sameName = true;
              this.displayedColumns1 = ['button', 'item', 'quantity', 'price'];
              this.displayedColumns2 = ['price', 'quantity', 'item', 'button'];
            }
          });
          this.hsmapi.getOrdersByName(this.name).subscribe(data => {
            if (data.body.error) {
              console.log("Can't fetch user orders");
            } else {
              let order = new Order();
              let i = 0;
              for (i = 0; i < data.body.buy.length; i++) {
                order.id = data.body.buy[i].id;
                order.buyOrSell = data.body.buy[i].buyOrSell;
                order.item = data.body.buy[i].item;
                order.price = data.body.buy[i].price;
                order.quantity = data.body.buy[i].quantity;
                order.user = data.body.buy[i].user;
                this.buyOrders.push(order);
                order = new Order();
              }
              for (i = 0; i < data.body.sell.length; i++) {
                order.id = data.body.sell[i].id;
                order.buyOrSell = data.body.sell[i].buyOrSell;
                order.item = data.body.sell[i].item;
                order.price = data.body.sell[i].price;
                order.quantity = data.body.sell[i].quantity;
                order.user = data.body.sell[i].user;
                this.sellOrders.push(order);
                order = new Order();
              }
              this.dataSource1 = new MatTableDataSource(this.buyOrders);
              this.dataSource2 = new MatTableDataSource(this.sellOrders);
              this.dataSource1.sort = this.sort1;
              this.dataSource2.sort = this.sort2;
              this.sort1.active = 'item';
              this.sort1.direction = 'asc';
              this.sort1.sortChange.emit({active: 'item', direction: 'asc'});
              this.sort2.active = 'item';
              this.sort2.direction = 'asc';
              this.sort2.sortChange.emit({active: 'item', direction: 'asc'});
            }
          });
        }
      });
    });
  }
  logout() {
    this.cookie.delete('auth-token', '/');
    this.cookie.delete('auth-token', '/profile');
    this.cookie.delete('auth-token', '/item');
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
  refreshOrders() {
    this.buyOrders = [];
    this.sellOrders = [];
    this.hsmapi.getOrdersByName(this.name).subscribe(data => {
      if (data.body.error) {
        console.log("Can't fetch user orders");
      } else {
        let order = new Order();
        let i = 0;
        for (i = 0; i < data.body.buy.length; i++) {
          order.id = data.body.buy[i].id;
          order.buyOrSell = data.body.buy[i].buyOrSell;
          order.item = data.body.buy[i].item;
          order.price = data.body.buy[i].price;
          order.quantity = data.body.buy[i].quantity;
          order.user = data.body.buy[i].user;
          this.buyOrders.push(order);
          order = new Order();
        }
        for (i = 0; i < data.body.sell.length; i++) {
          order.id = data.body.sell[i].id;
          order.buyOrSell = data.body.sell[i].buyOrSell;
          order.item = data.body.sell[i].item;
          order.price = data.body.sell[i].price;
          order.quantity = data.body.sell[i].quantity;
          order.user = data.body.sell[i].user;
          this.sellOrders.push(order);
          order = new Order();
        }
        this.dataSource1 = new MatTableDataSource(this.buyOrders);
        this.dataSource2 = new MatTableDataSource(this.sellOrders);
        this.dataSource1.sort = this.sort1;
        this.dataSource2.sort = this.sort2;
        this.sort1.active = 'item';
        this.sort1.direction = 'asc';
        this.sort1.sortChange.emit({active: 'item', direction: 'asc'});
        this.sort2.active = 'item';
        this.sort2.direction = 'asc';
        this.sort2.sortChange.emit({active: 'item', direction: 'asc'});
      }
    });
  }
  deleteOrder(id) {
    this.hsmapi.deleteOrderById({id: id}).subscribe(data => {
      this.refreshOrders();
    });
  }
}
