import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {UsersComponent} from "./components/users/users.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {MachinesComponent} from "./components/machines/machines.component";
import {AddMachineComponent} from "./components/add-machine/add-machine.component";
import {ErrorsComponent} from "./components/errors/errors.component";

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"errors",
    component: ErrorsComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"users",
    component: UsersComponent
  },
  {
    path:"add-user",
    component:AddUserComponent
  },
  {
    path:"edit-user/:id",
    component:EditUserComponent
  },
  {
    path:"machines",
    component:MachinesComponent
  },
  {
    path:"add-machine",
    component:AddMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
