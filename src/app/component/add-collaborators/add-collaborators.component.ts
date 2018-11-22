import { Component, OnInit,Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { environment } from '../../../environments/environment';
import { NoteService } from '../../core/services/noteServices/note.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-add-collaborators',
  templateUrl: './add-collaborators.component.html',
  styleUrls: ['./add-collaborators.component.scss']
})
export class AddCollaboratorsComponent implements OnInit {
  constructor(private noteService:NoteService ,public  dialogRef: MatDialogRef<AddCollaboratorsComponent>){ }
  @Inject(MAT_DIALOG_DATA)
  @Input() noteid
  ngOnInit() {
  }
  private userlist
  private image=localStorage.getItem('imageUrl');
  img=environment.imageUrl+this.image;
  email=localStorage.getItem('email');
  firstName=localStorage.getItem('firstName');
  lastName=localStorage.getItem('lastName');
  
  searchpeople(searchemail){
    console.log("search email",searchemail);
    var body={
      "searchWord":searchemail
    }
    this.noteService.searchuserlist(body).subscribe(data=>{
      LoggerService.log("success in collaborator search",data)
      this.userlist=data['data'].details;
    }),
    error=>{
      LoggerService.log("error in collaborator search",error);
    }
  }
  
}
