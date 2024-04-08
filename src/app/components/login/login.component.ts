import { Component, OnInit } from '@angular/core';
import {EndpointsService} from "../../services/endpoints.service";
import {Token} from "../../model";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myToken: Token = {} as Token;
  username:string = '';
  password:string = '';


  constructor(private endpointsService: EndpointsService, private router: Router, private config:ConfigService) { }

  ngOnInit(): void {
  }

  sendRequest():void{
    this.endpointsService.sendLoginRequest(this.username, this.password).subscribe((myToken)=>{
        this.myToken = myToken;
        localStorage.setItem("token", this.myToken.jwt);
        this.config.setUserName(this.username);
        this.config.setLoggedIn(true);

        const payload = JSON.parse(atob(myToken.jwt.split('.',)[1]));
        const permissions = payload.permissions;

        for(let i=0;i<permissions.length;i++){
          if(permissions[i]=="can_create_users"){
            this.config.setCanAdd(true);
          }
            if(permissions[i]=="can_delete_users"){
              this.config.setCanDelete(true);
          }
            if(permissions[i]=="can_read_users"){
              this.config.setCanRead(true);

          }
            if(permissions[i]=="can_update_users"){
              this.config.setCanEdit(true);
          }
            ///MACHINES
          if(permissions[i]=="can_search_machines"){
            this.config.setCanSearchMachine(true);
          }
          if(permissions[i]=="can_create_machines"){
            this.config.setCanCreateMachine(true);
          }
          if(permissions[i]=="can_destroy_machines"){
            this.config.setCanDestroyMachine(true);
          }
          if(permissions[i]=="can_start_machines"){
            this.config.setCanStartMachine(true);
          }
          if(permissions[i]=="can_stop_machines"){
            this.config.setCanStopMachine(true);
          }
          if(permissions[i]=="can_restart_machines"){
            this.config.setCanRestartMachine(true);
          }
        }

        if(permissions.length === 0){
          alert("Obavestenje: Nemate ni jednu permisiju!");
        }

        this.router.navigate(['']);
    },
      error => {
          alert('ERROR');
          this.username='';
          this.password='';
      })
  }

}
