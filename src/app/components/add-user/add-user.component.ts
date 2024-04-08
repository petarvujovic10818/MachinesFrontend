import { Component, OnInit } from '@angular/core';
import {Permission, User} from "../../model";
import {EndpointsService} from "../../services/endpoints.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";
import {errorObject} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  name:string = '';
  surname:string =  '';
  username:string = '';
  password:string = '';
  permissions: Permission[] = [];
  canread:boolean = false;
  cancreate:boolean =false;
  canupdate:boolean=false;
  candelete:boolean=false;
  user: User={} as User;

  constructor(private endpoints: EndpointsService, private router: Router, private config: ConfigService) {

  }

  ngOnInit(): void {
    this.user.name = this.name;
    this.user.surname = this.surname;
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.permissions = this.permissions;
  }

  getCanAddPerm(){
    return this.config.getCanAdd();
  }

  addUser(): void {
    if (this.canread) this.permissions.push({id: 1, name: "can_read_users"});
    if (this.cancreate) this.permissions.push({id: 2, name: "can_create_users"});
    if (this.canupdate) this.permissions.push({id: 3, name: "can_update_users"});
    if (this.candelete) this.permissions.push({id: 4, name: "can_delete_users"});

    if (this.name == '' || this.surname == '' || this.username == '' || this.password == '') {
      alert("All fields are required"!);
    } else{
      if(!this.getCanAddPerm()){
        alert("This user has no permission to create another user!")
      } else {
        this.endpoints.addUser(this.name, this.surname, this.username, this.password, this.permissions).subscribe((myUser) => {
            this.user = myUser;
            this.router.navigate(['users']);
          },
          error => {
            alert('ERRROR');
            this.name = '';
            this.surname = '';
            this.username = '';
            this.password = '';
            this.canread = false;
            this.cancreate = false;
            this.canupdate = false;
            this.candelete = false;
          });
      }
    }
  }

}
