import {Component, Injector, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [LoginComponent]
})
export class NavBarComponent implements OnInit {

  constructor(public login: LoginComponent) { }

  ngOnInit(): void {
  }
}
