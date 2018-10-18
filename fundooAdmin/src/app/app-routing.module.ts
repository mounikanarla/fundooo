import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:  'adminLogin',component:  AdminLoginComponent},
  {path:'dashboard',component:DashboardComponent}
]
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
  
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
