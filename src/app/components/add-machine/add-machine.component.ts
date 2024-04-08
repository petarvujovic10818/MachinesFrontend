import { Component, OnInit } from '@angular/core';
import {Machine, User} from "../../model";
import {EndpointsService} from "../../services/endpoints.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  name:string = '';
  status:string = 'STOPPED';
  active:boolean = false;
  user: User={} as User;
  machine: Machine={} as Machine;
  today: Date = new Date();
  date:string = '';


  constructor(private endpoints:EndpointsService, private router:Router, private config: ConfigService) {
    //this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    let day = ''
    switch(this.today.getMonth()){
      case 0:
        day = '01';
        break;
      case 1:
        day = '02';
        break;
      case 2:
        day = '03';
        break;
      case 3:
        day = '04';
        break;
      case 4:
        day = '05';
        break;
      case 5:
        day = '06';
        break;
      case 6:
        day = '07';
        break;
      case 7:
        day = '08';
        break;
      case 8:
        day = '09';
        break;
    }
    this.date = this.today.getDate() + '-' + day + '-' + this.today.getFullYear();
  }

  ngOnInit(): void {
    this.endpoints.getUserByUsername(this.config.getUserName()).subscribe((myUser)=>{
      this.user=myUser;
    });
  }

  //ubaci date

  addMachine(): void{
    //this.endpoints.getUserByUsername(this.config.getUserName()).subscribe((myUser)=>{
      //this.user=myUser;
      if(this.user!==null && this.user!==undefined) {
         this.endpoints.addMachine(this.name, this.status, this.active, this.user, this.date).subscribe((myMachine) => {
          this.machine = myMachine;
          this.router.navigate(['machines']);
        },
           error => {
                alert(error.status);
           })
      }

    //})
  }

}
