import { Component, OnInit } from '@angular/core';
import {HsmApiService} from '../services/hsm-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private hsmapi: HsmApiService) { }

  ngOnInit(): void {
  }

  register(form)
  {
    this.hsmapi.registerUser(form.value.name, form.value.email, form.value.password).subscribe(data => {

    });
  }

}
