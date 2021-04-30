import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HsmApiService} from '../services/hsm-api.service';
import {Router} from '@angular/router';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginComponent]
})

export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  temp: string;
  filteredOptions: Observable<string[]>;
  constructor(private hsmapi: HsmApiService, private router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this._filter(value))
      );
    this.hsmapi.getItemList().subscribe(data => {
      let i = 0;
      for (i; i < data.body.length; i++)
      {
        this.options.push(data.body[i].name);
      }
    });
  }
  private _filter(value: string): string[] {
    this.temp = value;
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  search() {
    this.router.navigate(['/item/' + this.myControl.value]);
  }
}
