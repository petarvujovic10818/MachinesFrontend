import { Component, OnInit } from '@angular/core';
import {User} from "../../model";
import {EndpointsService} from "../../services/endpoints.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  user: User={} as User;
  newUser: User = {} as User;



  constructor(private endpoints:EndpointsService, private router:Router, private config: ConfigService) { }

  ngOnInit(): void {
    this.endpoints.getUsers().subscribe((users)=>{
      this.users = users;
    })
  }

  addUser():void{
    this.router.navigate(['add-user'])
  }

  getAddPerm(){
    return this.config.getCanAdd();
  }

  getDeletePerm(){
    return this.config.getCanDelete();
  }

  getUpdatePerm() {
    return this.config.getCanEdit();
  }

  getReadPerm(){
    return this.config.getCanRead();
  }

  deleteUser(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    this.endpoints.deleteUser(id).subscribe((something)=>{
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].userID  == id){
        this.users.splice(i,1);
        break;
      }
    }
    });
  }

  getUser(id:string):void{
    this.endpoints.getUserById(id).subscribe((myUser=>{
      this.user = myUser;
    }));
  }

  updateUser(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    this.getUser(id);
    this.endpoints.updateUser(this.user,id).subscribe((data=>{
        this.newUser = data;
    }))
  }

  goToEdit(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    this.router.navigate([`edit-user/${id}`]);
  }

}
