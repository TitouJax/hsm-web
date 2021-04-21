import { Component, OnInit } from '@angular/core';
import {HsmApiService} from '../services/hsm-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private hsmapi: HsmApiService) { }

  ngOnInit(): void {
    console.log(this.hsmapi.getUserInfo().subscribe(data => {
      console.log(data);
    }));
  }

}
