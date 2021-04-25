import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  login: boolean;
  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.isLoged();
  }

  isLoged() {
    this.login = this.cookie.check('auth-token');
  }

}
