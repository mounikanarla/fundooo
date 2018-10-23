import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetComponent } from './component/reset/reset.component';
import{ TopBarComponent } from './component/top-bar/top-bar.component';
import{ NavbarComponent } from './component/navbar/navbar.component';
import { NavbaroneComponent } from './component/navbarone/navbarone.component';
import { NotesComponent } from './component/notes/notes.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
  {path:  'login',component:  LoginComponent},
  {path:  'signup',component: SignupComponent},
  {path: 'forgotPassword',component: ForgotPasswordComponent},
  {path:'resetpassword/:id', component:ResetComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'navbarone',component:NavbaroneComponent},
  {path:'home',component:HomeComponent},
{path:'navbarone',component:NavbaroneComponent,children:[
  {path:'',component:TopBarComponent},
  {path:'notes',component:NotesComponent},
  {path:'profile',component:ProfileComponent}
]},
   { path: '', redirectTo:  'login', pathMatch:  'full' }
  ]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
