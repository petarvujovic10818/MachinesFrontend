import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projekat-front';

  username: string='';
  //loggedIn: boolean=false;

  constructor(private config:ConfigService, private router: Router){

  }

  ngOnInit(): void {

  }

  getReadPerm(){
    return this.config.getCanRead();
  }

  getSearchMachinePerm(){
    return this.config.getCanSearchMachine();
  }

  getEditPerm(){
    return this.config.getCanEdit();
  }

  getDeletePerm(){
    return this.config.getCanDelete();
  }

  getAddPerm(){
    return this.config.getCanAdd();
  }

  getMyUser(){
    return this.config.getUserName();
  }

  getMyLoggedIn(){
    return this.config.getLoggedIn();
  }

  deleteToken():void{
    this.config.setLoggedIn(false);
    this.config.setUserName('');
    localStorage.setItem("token", '');

    this.router.navigate(['login']).then(()=>{
      window.location.reload();
    });
  }


}
