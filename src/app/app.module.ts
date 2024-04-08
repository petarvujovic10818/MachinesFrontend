import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MachinesComponent } from './components/machines/machines.component';
import { AddMachineComponent } from './components/add-machine/add-machine.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomHttpInterceptor} from "./interceptors/custom-http-interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from "@angular/material/core";
import { ErrorsComponent } from './components/errors/errors.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    MachinesComponent,
    AddMachineComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:CustomHttpInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
