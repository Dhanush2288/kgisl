import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch : "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent

  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"appointment",
    component:AppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
