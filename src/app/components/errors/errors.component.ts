import { Component, OnInit } from '@angular/core';
import {EndpointsService} from "../../services/endpoints.service";
import {ConfigService} from "../../services/config.service";
import {ErrorMessage, Machine} from "../../model";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errors: ErrorMessage[] = [];

  constructor(private endpoints: EndpointsService, private configService: ConfigService) { }

  ngOnInit(): void {

    this.endpoints.getUserByUsername(this.configService.getUserName()).subscribe((myUser)=>{
        this.endpoints.getAllErrors(myUser.userID).subscribe((myData)=>{
            this.errors = myData;
        })
    })

  }

}
