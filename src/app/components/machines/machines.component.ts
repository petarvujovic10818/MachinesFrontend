import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EndpointsService} from "../../services/endpoints.service";
import {ConfigService} from "../../services/config.service";
import {Router} from "@angular/router";
import {Machine, User} from "../../model";
import {SpinnerService} from "../../services/spinner.service";
import * as SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})

// interface OnChanges{
//   ngOnChanges(changes:SimpleChanges): void
// }

export class MachinesComponent implements OnInit {

  // @ts-ignore
  stompClient: CompatClient;

  isConnected: boolean = false;
  startInitMsg: string = '';

  user: User = {} as User;
  machines: Machine[] = [];

  name:string = '';
  status: string = '';

  scheduled: boolean = false;

  seconds: string = '';
  minutes: string = '';
  hours: string = '';
  day: string = '';
  month: string = '';

  //dateStart: Date = new Date();

  //dateEnd: Date = new Date();

  dateStart: string = '';
  dateEnd: string = '';

  elementId: number = 0;
  elementStatus: string = '';

  constructor(private endpoints:EndpointsService, private router:Router, private config:ConfigService, public spinnerService: SpinnerService) {
      for(let i=0;i<this.machines.length;i++){
        this.machines[i].myCircle = false;
      }
  }


  ngOnInit(): void {
    this.endpoints.getUserByUsername(this.config.getUserName()).subscribe((myUser=>{
      this.endpoints.getMachines(myUser.userID).subscribe((myData)=>{
        this.machines=myData;
        for(let i=0;i<this.machines.length;i++){
          this.machines[i].mySomething = false;
        }
        //console.log(this.machines)
      })
    }))

  }



  deleteMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    this.endpoints.deleteMachine(id).subscribe((myData)=>{
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id  == id){
          //this.machines.splice(i,1);
          this.machines[i].active = false;
          break;
        }
      }
    });

  }

  connect(){
    const jwt = localStorage.getItem("token");
    const socket = new SockJS(`http://localhost:8080/ws?jwt=${jwt}`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect.bind(this));
  }

  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log("Disconnected");
  }

  onConnect(frame:any){
    this.stompClient.subscribe('/topic/start', this.getInitMsg.bind(this));
    this.isConnected = true;
  }

  getInitMsg(messageOutput: any){
    this.startInitMsg = messageOutput.body;
  }


  startSocketMachine():void{

    this.connect();

    const token = localStorage.getItem("token");
    if(token!=null)
    this.endpoints.startSocketMachine(token).subscribe((myData)=>{
        if(myData=='START_READY')
        this.stompClient.send("/app/start-machine", {}, 'START');
    })
  }

  startMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    // @ts-ignore
    this.elementId = event.currentTarget.id;
    this.elementStatus = 'PENDING';
    this.endpoints.startMachine(id).subscribe((myData)=>{
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id  == id){
          //this.machines.splice(i,1);
          this.machines[i].status = 'RUNNING';
          this.elementStatus = '';
          break;
        }
      }
    })
  }

  startTestMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
      this.elementStatus = 'PENDING';
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id == id){
          this.machines[i].myCircle = true;
        }
      }
      this.endpoints.startTestMachine(id, "CHECK").subscribe((myData)=>{
        this.endpoints.startTestMachine(id, "INIT").subscribe((myData)=>{
          for(let i=0;i<this.machines.length;i++){
            if(this.machines[i].id  == id){
              this.machines[i].status = 'RUNNING';
              this.elementStatus = '';
              this.machines[i].myCircle = false;
              break;
            }
          }
        })
      })
  }

  restartTestMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    this.elementStatus = 'PENDING';
    for(let i=0;i<this.machines.length;i++){
      if(this.machines[i].id == id){
        this.machines[i].myCircle = true;
      }
    }
    this.endpoints.restartTestMachine(id, "CHECK").subscribe((myData)=>{
      this.endpoints.restartTestMachine(id, "INIT").subscribe((myData)=>{
        for(let i=0;i<this.machines.length;i++){
          if(this.machines[i].id  == id){
            this.machines[i].status = 'STOPPED';
            //this.elementStatus = '';
            //this.machines[i].myCircle = false;
            break;
          }
        }
        this.endpoints.restartTestMachine(id, "INIT2").subscribe((myData)=>{
          for(let i=0;i<this.machines.length;i++){
            if(this.machines[i].id == id){
              this.machines[i].status = 'RUNNING';
              this.elementStatus = '';
              this.machines[i].myCircle = false;
              break;
            }
          }
        })
      })
    })
  }

  stopTestMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
      this.elementStatus = 'PENDING';
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id == id){
          this.machines[i].myCircle = true;
        }
      }
      this.endpoints.stopTestMachine(id, "CHECK").subscribe((myData)=>{
        this.endpoints.stopTestMachine(id, "INIT").subscribe((myData)=>{
          for(let i=0;i<this.machines.length;i++){
            if(this.machines[i].id  == id){
              this.machines[i].status = 'STOPPED';
              this.elementStatus = '';
              this.machines[i].myCircle = false;
              break;
            }
          }
        })
      })
  }

  xooMachine(machines: Machine[], id: number, elementStatus:string){
    for(let i=0;i<machines.length;i++){
      if(machines[i].id  == id){
        machines[i].status = 'RUNNING';
        elementStatus = '';
        break;
      }
    }
  }

  startScheduledMachine(event:Event){
    // @ts-ignore
    const id = event.currentTarget.id

    const nowDate = new Date();
    const secDiff: number = Number(this.seconds) - nowDate.getSeconds();
    const minDiff: number = Number(this.minutes) - nowDate.getMinutes();
    const hourDiff: number = Number(this.hours) - nowDate.getHours()

    let waitTime: number = (hourDiff*60*60) + (minDiff*60) + secDiff;

    //console.log("This is my WaitTime: " + waitTime);

    this.endpoints.startScheduledMachine(id, this.seconds, this.minutes, this.hours, this.day, this.month).subscribe((myData)=>{

        setTimeout(() =>{
          for(let i=0;i<this.machines.length;i++){
            if(this.machines[i].id  == id){
              //this.machines.splice(i,1);
              this.machines[i].status = 'RUNNING';
              this.elementStatus = '';
              break;
            }
          }
        }, (waitTime+1)*1000);
    })
  }

  restartScheduledMachine(event:Event){
    // @ts-ignore
    const id = event.currentTarget.id

    const nowDate = new Date();
    const secDiff: number = Number(this.seconds) - nowDate.getSeconds();
    const minDiff: number = Number(this.minutes) - nowDate.getMinutes();
    const hourDiff: number = Number(this.hours) - nowDate.getHours()

    let waitTime: number = (hourDiff*60*60) + (minDiff*60) + secDiff;

    this.endpoints.restartScheduledMachine(id, this.seconds, this.minutes, this.hours, this.day, this.month).subscribe((myData)=>{
      setTimeout(() =>{
        for(let i=0;i<this.machines.length;i++){
          if(this.machines[i].id  == id){
            //this.machines.splice(i,1);
            this.machines[i].status = 'STOPPED';
            this.elementStatus = '';
            break;
          }
        }
        setTimeout(()=>{
          for(let i=0;i<this.machines.length;i++){
            if(this.machines[i].id  == id){
              //this.machines.splice(i,1);
              this.machines[i].status = 'RUNNING';
              this.elementStatus = '';
              break;
            }
          }
        },5000);
      }, (waitTime+1)*1000);
    })
  }

  stopScheduledMachine(event:Event){
    // @ts-ignore
    const id = event.currentTarget.id

    const nowDate = new Date();
    const secDiff: number = Number(this.seconds) - nowDate.getSeconds();
    const minDiff: number = Number(this.minutes) - nowDate.getMinutes();
    const hourDiff: number = Number(this.hours) - nowDate.getHours()

    let waitTime: number = (hourDiff*60*60) + (minDiff*60) + secDiff;

    this.endpoints.stopScheduledMachine(id, this.seconds, this.minutes, this.hours, this.day, this.month).subscribe((myData)=>{
      setTimeout(() =>{
        for(let i=0;i<this.machines.length;i++){
          if(this.machines[i].id  == id){
            //this.machines.splice(i,1);
            this.machines[i].status = 'STOPPED';
            this.elementStatus = '';
            break;
          }
        }
      }, (waitTime+1)*1000);
    })
  }

  startMachineWithSockets(event: Event): void{
      // @ts-ignore
    const id = event.currentTarget.id;
    const jwt = localStorage.getItem('token');
  }

  stopMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    // @ts-ignore
    this.elementId = event.currentTarget.id;
    this.elementStatus = 'PENDING';
    this.endpoints.stopMachine(id).subscribe((myData)=>{
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id  == id){
          //this.machines.splice(i,1);
          this.machines[i].status = 'STOPPED';
          this.elementStatus = '';
          break;
        }
      }
    })
  }

  restartMachine(event:Event):void{
    // @ts-ignore
    const id = event.currentTarget.id;
    // @ts-ignore
    this.elementId = event.currentTarget.id;
    this.endpoints.restartMachine(id).subscribe((myData)=>{
      for(let i=0;i<this.machines.length;i++){
        if(this.machines[i].id  == id){
          //this.machines.splice(i,1);
          this.machines[i].status = 'STOPPED';
          break;
        }
      }
    })
  }

  goToAddMachine():void{
    this.router.navigate(['add-machine']);
  }

  filterMachines(name:string,status:string, dateFrom: string, dateTo: string){

    let startDay = dateFrom.toString().slice(8,10);
    let startMonth = this.getMonthOfDateUtil(this.dateStart.toString());
    let startYear = dateFrom.toString().slice(11,15);
    let formatedStartDate = startDay + '-' + startMonth + '-' + startYear;

    if(formatedStartDate == '--'){
      formatedStartDate = '';
    }

    let endDay = dateTo.toString().slice(8,10);
    let endMonth = this.getMonthOfDateUtil(this.dateEnd.toString());
    let endYear = dateTo.toString().slice(11,15);
    let formattedEndDate = endDay + '-' + endMonth + '-' + endYear;

    if(formattedEndDate =='--'){
      formattedEndDate = '';
    }

    this.endpoints.getMachinesFilter(name,status,formatedStartDate,formattedEndDate).subscribe((myData)=>{
      this.machines = myData;
    })
  }

  getMonthOfDateUtil(date:string):string{
    let month = date.slice(4,7);
    switch(month) {
      case 'Jan':
        month = '01';
        break;
      case 'Feb':
        month = '02';
        break;
      case 'Mar':
        month = '03';
        break;
      case 'Apr':
        month = '04';
        break;
      case 'May':
        month = '05';
        break;
      case 'Jun':
        month = '06';
        break;
      case 'Jul':
        month = '07';
        break;
      case 'Aug':
        month = '08';
        break;
      case 'Sep':
        month = '09';
        break;
      case 'Oct':
        month = '10';
        break;
      case 'Nov':
        month = '11';
        break;
      case 'Dec':
        month = '12';
        break;
    }
    return month;
  }

  getUserByUsername(){
    this.endpoints.getUserByUsername(this.config.getUserName()).subscribe((myUser=>{
        this.user = myUser;
    }))
  }

  getSearchPerm(){
    return this.config.getCanSearchMachine();
  }

  getRestartPerm(){
    return this.config.getCanRestartMachine();
  }

  getCreatePerm(){
    return this.config.getCanCreateMachine();
  }

  getDestroyPerm(){
    return this.config.getCanDestroyMachine();
  }

  getStartPerm(){
    return this.config.getCanStartMachine();
  }

  getStopPerm(){
    return this.config.getCanStopMachine();
  }

}
