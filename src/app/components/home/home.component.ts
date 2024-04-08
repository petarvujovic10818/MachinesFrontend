import { Component, OnInit } from '@angular/core';
import {Permission, Token} from "../../model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  permissions: Permission[] = [];

  constructor() {

  }

  ngOnInit(): void {

    const token = localStorage.getItem("token");
    if(token!== null){
      const payload = JSON.parse(atob(token.split('.',)[1]));
      this.permissions = payload.permissions;
    }

  }

}
