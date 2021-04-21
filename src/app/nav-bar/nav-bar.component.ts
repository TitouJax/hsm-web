import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  login: boolean = this.cookie.check('auth-token');
  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    console.log(this.login);
  }

}
