import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import{ AuthGuard} from './components/guard/auth.guard';
const routes: Routes = [
  {path:  'adminLogin',component:  AdminLoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'',redirectTo: 'adminLogin', canActivate:[AuthGuard],pathMatch:'full'}
]
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
  
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
