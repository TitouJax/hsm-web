import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HsmApiService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // apiBase = 'http://localhost:3000/api/';
  apiBase = 'https://hsm-api.herokuapp.com/api/';
  authCookie = this.cookie.get('auth-token');
  httpOptions = {headers: {'Content-Type': 'application/json', 'auth-token': this.authCookie}, observe: 'response' as 'response'};

  // AUTH
  getLoginToken(email, password) {
    const body = JSON.stringify({email: email, password: password});
    return this.http.post<any>(this.apiBase + 'user/login', body, this.httpOptions);
  }
  registerUser(name, email, password) {
    const body = JSON.stringify({name: name, email: email, password: password});
    return this.http.post<any>(this.apiBase + 'user/register', body, this.httpOptions);
  }

  // ITEM

  getItemList() {
    return this.http.get<any>( this.apiBase + 'item', this.httpOptions);
  }

  getItem(item) {
    return this.http.get<any>(this.apiBase + 'item/' + item, this.httpOptions);
  }

  // ORDERS

  getItemOrders(item) {
    return this.http.get<any>(this.apiBase + 'orders/' + item, this.httpOptions);
  }

  getUserInfo(name) {
    return this.http.get<any>(this.apiBase + 'user/profile/' + name, this.httpOptions);
  }

  getUser() {
    return this.http.get<any>(this.apiBase + 'user/profile', this.httpOptions);
  }
  createOrder(body) {
    return this.http.post<any>(this.apiBase + 'orders/create', body, this.httpOptions);
  }

  getOrdersByName(name) {
    return this.http.get<any>(this.apiBase + 'user/profile/' + name, this.httpOptions);
  }
}
