import { Component, OnInit } from '@angular/core';
import {HsmApiService} from '../services/hsm-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  wrong: string;
  constructor(private router: Router, private hsmapi: HsmApiService) { }

  ngOnInit(): void {
  }

  register(form)
  {
    this.hsmapi.registerUser(form.value.name, form.value.email, form.value.password).subscribe(data => {
      if (data.body.error)
      {
        this.wrong = data.body.error;
      }
      else {
        this.router.navigate(['/login']);
      }
    });
  }

}
