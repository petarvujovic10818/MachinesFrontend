import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private userName:string;
  private loggedIn:boolean;

  private canRead:boolean;
  private canEdit:boolean;
  private canAdd:boolean;
  private canDelete:boolean;

  private canSearchMachine: boolean;
  private canCreateMachine: boolean;
  private canDestroyMachine: boolean;
  private canStartMachine: boolean;
  private canStopMachine: boolean;
  private canRestartMachine: boolean;

  constructor() {
    this.userName = '';
    this.loggedIn=false;

    this.canRead = false;
    this.canEdit =false;
    this.canAdd=false;
    this.canDelete = false;

    this.canSearchMachine = false;
    this.canCreateMachine = false;
    this.canDestroyMachine = false;
    this.canStartMachine = false;
    this.canStopMachine = false;
    this.canRestartMachine = false;
  }


  setUserName(userName:string):void{
    this.userName=userName;
  }

  getUserName():string{
    return this.userName;
  }

  getLoggedIn():boolean{
    return this.loggedIn;
  }

  setLoggedIn(loggedIn:boolean):void{
    this.loggedIn=loggedIn;
  }

  setCanAdd(canAdd:boolean):void{
    this.canAdd = canAdd;
  }

  getCanAdd():boolean{
    return this.canAdd;
  }

  setCanEdit(canEdit:boolean):void{
    this.canEdit = canEdit;
  }

  getCanEdit():boolean{
    return this.canEdit;
  }

  setCanDelete(canDelete:boolean):void{
    this.canDelete = canDelete;
  }

  getCanDelete():boolean{
    return this.canDelete;
  }

  setCanRead(canRead:boolean):void{
    this.canRead = canRead;
  }

  getCanRead():boolean{
    return this.canRead;
  }

  setCanSearchMachine(canSearchMachine:boolean):void{
    this.canSearchMachine = canSearchMachine;
  }

  getCanSearchMachine():boolean{
    return this.canSearchMachine;
  }

  setCanCreateMachine(canCreateMachine:boolean):void{
    this.canCreateMachine = canCreateMachine;
  }

  getCanCreateMachine():boolean{
    return this.canCreateMachine;
  }

  setCanDestroyMachine(canDestroyMachine:boolean):void{
    this.canDestroyMachine = canDestroyMachine;
  }

  getCanDestroyMachine():boolean{
    return this.canSearchMachine;
  }

  setCanStopMachine(canStopMachine:boolean):void{
    this.canStopMachine = canStopMachine;
  }

  getCanStopMachine():boolean{
    return this.canStopMachine;
  }

  setCanStartMachine(canStartMachine:boolean):void{
    this.canStartMachine = canStartMachine;
  }

  getCanStartMachine():boolean{
    return this.canStartMachine;
  }

  setCanRestartMachine(canRestartMachine:boolean):void{
    this.canRestartMachine= canRestartMachine;
  }

  getCanRestartMachine():boolean{
    return this.canRestartMachine;
  }

}
