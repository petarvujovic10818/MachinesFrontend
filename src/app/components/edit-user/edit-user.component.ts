import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Permission, User} from "../../model";
import {EndpointsService} from "../../services/endpoints.service";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id:string = '';
  user:User = {} as User;

  name:string = '';
  surname:string = '';
  username:string = '';
  password:string = '';
  permissions:Permission[] = [];

  canread:boolean = false;
  cancreate:boolean = false;
  canupdate:boolean = false;
  candelete:boolean = false;

  cansearchmachines: boolean = false;
  cancreatemachines: boolean = false;
  candestroymachines: boolean = false;
  canstartmachines: boolean = false;
  canstopmachines: boolean = false;
  canrestartmachines: boolean = false;

  constructor(private route:ActivatedRoute, private endpoints:EndpointsService, private router: Router, private config: ConfigService) {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
      this.endpoints.getUserById(this.id).subscribe((myUser)=>{
        this.name = myUser.name;
        this.surname = myUser.surname;
        this.username = myUser.username;
        this.password = myUser.password;

        // const token = localStorage.getItem("token");
        // if(token!=null){
        //   console.log("This is token: " + token);
        //   const payload = JSON.parse(atob(token.split('.',)[1]));
        //   console.log("Thsi is payload: " + payload);
        //   const permissions = payload.permissions;
        //   console.log("This is : " + permissions);
        //
        //   for(let i=0;i<permissions.length;i++){
        //     if(permissions[i]=="can_create_users"){
        //       this.cancreate=true;
        //       console.log("Can create " + this.cancreate);
        //     }
        //     if(permissions[i]=="can_delete_users"){
        //       this.candelete=true;
        //       console.log("Can delete " + this.candelete);
        //     }
        //     if(permissions[i]=="can_read_users"){
        //       this.canread=true;
        //       console.log("Can read " + this.canread);
        //
        //     }
        //     if(permissions[i]=="can_update_users"){
        //       this.canupdate=true;
        //       console.log("Can update " + this.canupdate);
        //     }
        //   }
        // }
        //const payload = JSON.parse(atob(token.split('.',)[1]));

        this.permissions = myUser.permissions;

        for(let i=0;i<this.permissions.length;i++){
          if(this.permissions[i].name=='can_read_users') this.canread=true;
          if(this.permissions[i].name== 'can_create_users') this.cancreate=true;
          if(this.permissions[i].name=='can_update_users') this.canupdate=true;
          if(this.permissions[i].name=='can_delete_users') this.candelete=true;

          if(this.permissions[i].name=='can_search_machines') this.cansearchmachines=true;
          if(this.permissions[i].name=='can_create_machines') this.cancreatemachines=true;
          if(this.permissions[i].name=='can_destroy_machines') this.candestroymachines=true;
          if(this.permissions[i].name=='can_start_machines') this.canstartmachines=true;
          if(this.permissions[i].name=='can_stop_machines') this.canstopmachines=true;
          if(this.permissions[i].name=='can_restart_machines') this.canrestartmachines=true;
        }

      });
  }

  updateUser():void{

    for(let i=0;i<this.permissions.length;i++){
      if(this.permissions[i].name == 'can_read_users' && !this.canread) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_create_users' && !this.cancreate) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_update_users' && !this.canupdate) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_delete_users' && !this.candelete) this.permissions.splice(i, 1);

      if(this.permissions[i].name == 'can_search_machines' && !this.cansearchmachines) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_create_machines' && !this.cancreatemachines) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_destroy_machines' && !this.candestroymachines) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_start_machines' && !this.canstartmachines) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_stop_machines' && !this.canstopmachines) this.permissions.splice(i, 1);
      if(this.permissions[i].name == 'can_restart_machines' && !this.canrestartmachines) this.permissions.splice(i, 1);
    }


      if(this.permissions.filter(x =>{
        return x.name== 'can_read_users';
      }).length==0 && this.canread) this.permissions.push({id:1, name:"can_read_users"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_create_users';
      }).length==0 && this.cancreate) this.permissions.push({id:2, name:"can_create_users"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_update_users';
      }).length==0 && this.canupdate) this.permissions.push({id:3, name:"can_update_users"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_delete_users';
      }).length==0 && this.candelete) this.permissions.push({id:4, name:"can_delete_users"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_search_machines';
      }).length==0 && this.cansearchmachines) this.permissions.push({id:5, name:"can_search_machines"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_start_machines';
      }).length==0 && this.canstartmachines) this.permissions.push({id:6, name:"can_start_machines"});

      if(this.permissions.filter(x =>{
        return x.name== 'can_stop_machines';
      }).length==0 && this.canstopmachines) this.permissions.push({id:7, name:"can_stop_machines"});

    if(this.permissions.filter(x =>{
      return x.name== 'can_restart_machines';
    }).length==0 && this.canrestartmachines) this.permissions.push({id:8, name:"can_restart_machines"});

    if(this.permissions.filter(x =>{
      return x.name== 'can_create_machines';
    }).length==0 && this.cancreatemachines) this.permissions.push({id:9, name:"can_create_machines"});

    if(this.permissions.filter(x =>{
      return x.name== 'can_destroy_machines';
    }).length==0 && this.candestroymachines) this.permissions.push({id:10, name:"can_destroy_machines"});


    this.endpoints.updateUser({userID:+this.id,name:this.name,surname:this.surname,username:this.username,password:this.password,
    permissions:this.permissions},this.id).subscribe((myUser)=>{
        this.user = myUser;
        this.router.navigate(['users']);
    },
      error => {
        alert('ERRROR');
      });
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

}
