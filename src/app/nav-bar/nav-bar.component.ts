import {Component, Injector, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {HsmApiService} from '../services/hsm-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [LoginComponent]
})
export class NavBarComponent implements OnInit {

  name: string;
  constructor(private hsm: HsmApiService, public login: LoginComponent) { }

  ngOnInit(): void {
    this.hsm.getUser().subscribe(data => {
      this.name = data.body.name;
    });

  }
  refresh() {
      this.hsm.getUser().subscribe(data => {
        this.name = data.body.name;
      });
  }
}
