import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import {MatDialog} from '@angular/material';
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
  
  /*
  * @description: @INPUT AND @Output are decorators used to bind the data
  */
  @Input()  newData;
  @Input() searchInput;
  @Output() eventEmit = new EventEmitter();
//  @Output() 
  /*
  * @description:ngOnInit is used for all the initialization/declaration and avoid stuff to work in the 
  */
  ngOnInit() {
    console.log(this.newData)
  }
  /*
  * @description : emit(event) is used to emit the event coming from child component at the time of action
  */
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
      this.eventEmit.emit({});

    });

  }
   labelEmit(event){
    console.log(event)
    if(event){
      this.eventEmit.emit({});

    }
  }
  removelabel(index,label)
  {
    // this.accepted = true;
    console.log(index)
    console.log(label);
    this.httpService.logoutPost("notes/"+index.id+"/addLabelToNotes/"+label.id+"/remove",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added"+response)
      this.eventEmit.emit({});},
    (error)=>{
      console.log("error occured"+error)
    }
  )
  }
}
