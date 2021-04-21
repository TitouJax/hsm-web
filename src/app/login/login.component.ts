import { Component, OnInit } from '@angular/core';
import {HsmApiService} from '../services/hsm-api.service';
import {stringify} from 'querystring';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private hsmapi: HsmApiService, private cookie: CookieService, private router: Router) { }

  wrong: string;
  ngOnInit(): void {
  }

  login(form)
  {
    this.hsmapi.getLoginToken(form.value.email, form.value.password).subscribe(data => {
      if (data.body.error != null) {
        this.wrong = data.body.error;
      } else {
        this.cookie.set('auth-token', data.body.token);
        this.router.navigate(['/']);
      }
    });
  }
}
