import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetComponent } from './component/reset/reset.component';
import { NavbaroneComponent } from './component/navbarone/navbarone.component';
import { NotesComponent } from './component/notes/notes.component';
import { HomeComponent } from './component/home/home.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { ParentComponent } from './component/parent/parent.component';
import { MainArchiveComponent } from './component/main-archive/main-archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { UpdateComponent } from './component/update/update.component';
import { AddlabelComponent } from './component/addlabel/addlabel.component';
import { SearchComponent } from './component/search/search.component';
import { LabelclickComponent } from './component/labelclick/labelclick.component';
import { ReminderNotesComponent } from './component/reminder-notes/reminder-notes.component';


const routes: Routes = [
  {path:  'login',component:  LoginComponent},
  {path:  'signup',component: SignupComponent},
  {path: 'forgotPassword',component: ForgotPasswordComponent},
  {path:'resetpassword/:id', component:ResetComponent},
  {path:'navbarone',component:NavbaroneComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'notes',pathMatch:'full'},
    {path:'notes',component:ParentComponent},
    {path:'archive',component:MainArchiveComponent},
    {path:'trash',component:TrashComponent},
    {path:'search',component:SearchComponent},
    {path:'label/:params',component:LabelclickComponent},
    {path:'reminders',component:ReminderNotesComponent}
    // {path:'addlabel',component: AddlabelComponent }
  ]},
  { path: '', redirectTo:  'login', pathMatch:  'full' }
]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
