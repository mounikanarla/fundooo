import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  {path:  'adminLogin',component:  AdminLoginComponent},
]
@NgModule({
   imports: [ RouterModule.forRoot(routes) ],
  
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
