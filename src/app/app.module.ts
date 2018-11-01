import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './component/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetComponent } from './component/reset/reset.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { NavbaroneComponent } from './component/navbarone/navbarone.component';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ChangecolorComponent } from './component/changecolor/changecolor.component';
import { ImageComponent } from './component/image/image.component';
import { ArchieveComponent } from './component/archieve/archieve.component';
import { MoreComponent } from './component/more/more.component';
import { UndoComponent } from './component/undo/undo.component';
import { RedoComponent } from './component/redo/redo.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import { AddnoteComponent } from './component/addnote/addnote.component';
import { ParentComponent } from './component/parent/parent.component';
import { MainArchiveComponent } from './component/main-archive/main-archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { UpdateComponent } from './component/update/update.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddlabelComponent } from './component/addlabel/addlabel.component';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';
import { SearchComponent } from './component/search/search.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetComponent,
    NavbaroneComponent,
    NotesComponent,
    ReminderComponent,
    CollaboratorComponent,
    ChangecolorComponent,
    ImageComponent,
    ArchieveComponent,
    MoreComponent,
    UndoComponent,
    RedoComponent,
    ProfileComponent,
    HomeComponent,
    AddnoteComponent,
    ParentComponent,
    MainArchiveComponent,
    TrashComponent,
    UpdateComponent,
    AddlabelComponent,
    SearchPipe,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddnoteComponent,UpdateComponent,NavbaroneComponent,AddlabelComponent]
  

})
export class AppModule { }
