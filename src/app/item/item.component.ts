import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HsmApiService } from '../services/hsm-api.service';
import { Item } from '../class/item';
import { Order } from '../class/order';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [LoginComponent]
})
export class ItemComponent implements OnInit {

  dialPrice: number;
  dialQuantity: number;
  item: Item;
  sellOrders: Order[];
  buyOrders: Order[];
  dataSource1;
  dataSource2;
  displayedColumns1: string[] = ['button', 'user', 'quantity', 'price'];
  displayedColumns2: string[] = ['price', 'quantity', 'user', 'button'];
  constructor(private route: ActivatedRoute, private hsmapi: HsmApiService, public login: LoginComponent, public dialog: MatDialog) { }

  @ViewChild('table1', {read: MatSort}) sort1: MatSort;
  @ViewChild('table2', {read: MatSort}) sort2: MatSort;
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
        this.dataSource1 = new MatTableDataSource(this.buyOrders);
        this.dataSource2 = new MatTableDataSource(this.sellOrders);
        this.dataSource1.sort = this.sort1;
        this.dataSource2.sort = this.sort2;
        this.sort1.active = 'price';
        this.sort1.direction = 'desc';
        this.sort1.sortChange.emit({active: 'price', direction: 'desc'});
        this.sort2.active = 'price';
        this.sort2.direction = 'asc';
        this.sort2.sortChange.emit({active: 'price', direction: 'asc'});
        console.log(this.buyOrders);
      });
    });
  }

  openDialog(btn): void {
    const msg = btn._elementRef.nativeElement.id;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        item: this.item.name,
        buyOrSell: msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hsmapi.createOrder(result).subscribe(data => {
        });
      }
    });
  }

  copy(cmd, name) {
    navigator.clipboard.writeText(cmd + ' ' + name);
  }

}
