import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OrderAddComponent} from './order-add/order-add.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ItemComponent} from './item/item.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'add', component: OrderAddComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'item/:item', component: ItemComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
