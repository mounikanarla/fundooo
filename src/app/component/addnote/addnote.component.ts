import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  constructor(private httpService: SignupService,public dialog: MatDialog) { }
  public array=[];
  token=localStorage.getItem('id');
  // dataRefresher: any;
  @Input()  newData;
  @Output() eventEmit = new EventEmitter();
  // @Output() onEmit = new EventEmitter();
  // @Output() archiveEmit = new EventEmitter();
  
  ngOnInit() {
    console.log(this.newData)
  }
  emit(event){
    console.log(event)
    if(event){
      this.eventEmit.emit({});
    }
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
    
     data: {title:note.title, description:note.description,id:note.id,color:note.color}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.eventEmit.emit({});

    });
  }
}
