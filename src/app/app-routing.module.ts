import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetComponent } from './component/reset/reset.component';
import{ TopBarComponent } from './component/top-bar/top-bar.component';
import{ NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [
  {path:  'login',component:  LoginComponent},
  {path:  'signup',component: SignupComponent},
  {path: 'forgotPassword',component: ForgotPasswordComponent},
  {path:'resetpassword/:id', component:ResetComponent},
  {path:'topBar',component:TopBarComponent},
  {path:'navbar',component:NavbarComponent},

   { path: '', redirectTo:  'login', pathMatch:  'full' }
  ]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }