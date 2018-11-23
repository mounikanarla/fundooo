import { Component, OnInit,Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/userServices/user.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NoteService } from '../../core/services/noteServices/note.service';

@Component({
  selector: 'app-add-collaborators',
  templateUrl: './add-collaborators.component.html',
  styleUrls: ['./add-collaborators.component.scss']
})
export class AddCollaboratorsComponent implements OnInit {
  constructor(private userService: UserService ,private noteService:NoteService,public  dialogRef: MatDialogRef<AddCollaboratorsComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){ }
  @Input() noteid
  ngOnInit() {

  }
  private usersData
  private image=localStorage.getItem('imageUrl');
  img=environment.imageUrl+this.image;
  email=localStorage.getItem('email');
  firstName=localStorage.getItem('firstName');
  lastName=localStorage.getItem('lastName');
  userId=localStorage.getItem('userId')
  public searchemail
  searchpeople(){
    console.log("search email",this.searchemail);
    if(this.searchemail!=null && this.searchemail != undefined &&  this.searchemail!=""){
    var body={
      "searchWord":this.searchemail
    }
    this.userService.searchpeople(body).subscribe(data=>{
      LoggerService.log("success in collaborator search",data)
      this.usersData=data['data'].details;
    },
    error=>{
      LoggerService.log("error in collaborator search",error);
    }
  )
  }
  }
  collabArray=[]
  addCollab(search){
    console.log(search)
    var body={
      "firstName":search.firstName,
      "lastName":search.lastName,
      "email":search.email,
      "userId":search.userId
    }
    this.noteService.addCollaborators(this.data,body).subscribe(data=>{
      LoggerService.log("success in addcollaborator",data)
      this.collabArray=data['data'].details;

    },
    error=>{
      LoggerService.log("success in addcollaborator",error)
     })
  }
}
