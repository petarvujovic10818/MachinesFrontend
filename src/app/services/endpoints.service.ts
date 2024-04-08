import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest, Machine, Permission, Token, User, ErrorMessage} from "../model";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private readonly URL = environment.myURL

  constructor(private httpClient: HttpClient) {

  }


  sendLoginRequest(username:string,password:string): Observable<Token>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

      return this.httpClient.post<Token>(`${this.URL}/auth/login`, {username:username,password:password}, httpOptions);

  }

  getUsers(): Observable<User[]>{

    const httpOptions = {
      headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.get<User[]>(`${this.URL}/api/users/all`, httpOptions);
  }

  getAllErrors(id:number): Observable<ErrorMessage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.get<ErrorMessage[]>(`${this.URL}/api/errors/all/${id}`, httpOptions)

  }



  getMachines(id:number): Observable<Machine[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.get<Machine[]>(`${this.URL}/api/machines/all/${id}`, httpOptions)
  }

  getMachinesFilter(name:string,status:string, dateFrom:string, dateTo:string):Observable<Machine[]>{
    let params = new HttpParams().set('name', name).set('status', status).set('dateFrom', dateFrom).set('dateTo', dateTo);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };

    return this.httpClient.get<Machine[]>(`${this.URL}/api/machines/all`, httpOptions);
  }

  addMachine(name:string,status:string,active:boolean,user:User,date:string):Observable<Machine>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.post<Machine>(`${this.URL}/api/machines`,{name:name,status:status,active:active,user:user,
        dateCreated: date},
      httpOptions);
  }

  deleteMachine(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/${id}`, "", httpOptions);
  }

  startMachine(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/start/${id}`, "", httpOptions);

  }

  startTestMachine(id:number, extra:string): Observable<any>{
    let params = new HttpParams().set("extra",extra);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };
    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/start-test/${id}`, "", httpOptions);
  }

  stopTestMachine(id:number, extra:string): Observable<any>{
    let params = new HttpParams().set("extra",extra);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };
    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/stop-test/${id}`, "", httpOptions);
  }

  restartTestMachine(id:number, extra:string): Observable<any>{
    let params = new HttpParams().set("extra",extra);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };
    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/restart-test/${id}`, "", httpOptions);
  }

  startScheduledMachine(id:number, seconds:string, minutes:string, hours:string, day:string, month:string):Observable<any>{
    let params = new HttpParams().set('seconds', seconds).set('minutes', minutes).set('hours', hours).set('day', day).set('month', month);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/start/scheduled/${id}`, "", httpOptions);

  }

  stopScheduledMachine(id:number, seconds:string, minutes:string, hours:string, day:string, month:string):Observable<any>{
    let params = new HttpParams().set('seconds', seconds).set('minutes', minutes).set('hours', hours).set('day', day).set('month', month);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/stop/scheduled/${id}`, "", httpOptions);

  }

  restartScheduledMachine(id:number, seconds:string, minutes:string, hours:string, day:string, month:string):Observable<any>{
    let params = new HttpParams().set('seconds', seconds).set('minutes', minutes).set('hours', hours).set('day', day).set('month', month);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params:params
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/restart/scheduled/${id}`, "", httpOptions);

  }

  startSocketMachine(jwt:string):Observable<any>{
    let params = new HttpParams().set('jwt', jwt);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params:params
    };

    return this.httpClient.get<any>(`${this.URL}/api/machines/start-machine`, httpOptions);

  }

  stopMachine(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/stop/${id}`, "", httpOptions);

  }

  restartMachine(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.patch<Machine>(`${this.URL}/api/machines/restart/${id}`, "", httpOptions);

  }

  addUser(name:string,surname:string,username:string,password:string,permissions:Permission[]): Observable<User>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.httpClient.post<User>(`${this.URL}/api/users`,
      {name:name,surname:surname,username:username,password:password,permissions:permissions}, httpOptions);
  }

  deleteUser(id:string): Observable<User>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    return this.httpClient.delete<User>(`${this.URL}/api/users/${id}`,{headers});
  }

  updateUser(user:User, id:string):Observable<User>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    return this.httpClient.put<User>(`${this.URL}/api/users`,user,{headers});
  }

  getUserById(id: string):Observable<User>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    return this.httpClient.get<User>(`${this.URL}/api/users/${id}`,{headers});
  }

  getMachineById(id:string):Observable<Machine>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    return this.httpClient.get<Machine>(`${this.URL}/api/machines/${id}`,{headers});
  }

  getUserByUsername(username:string):Observable<User>{
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    return this.httpClient.get<User>(`${this.URL}/api/users/u/${username}`,{headers});
  }

}
