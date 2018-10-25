import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  constructor(private httpService: SignupService,public snackBar : MatSnackBar) { }

  @Input()  noteid;
  @Output() archiveEmit = new EventEmitter();  
  token=localStorage.getItem('id');
public body:any={}
  ngOnInit() {
  }
  archive(){
    console.log(this.noteid)
    var array=[]
    array.push(this.noteid)
    this.httpService.colorPost("notes/archiveNotes", this.body ={
      "isArchived": true,
      "noteIdList":array

  },this.token).subscribe((response) =>{
   
  // console.log(  this.onEmit.emit() )
    console.log("successful",response);
    this.snackBar.open("Archived", "ok", {
      duration: 2000,
    });
    this.archiveEmit.emit({}) ;
  },
  (error)=>{
    console.log("error",error);

  })
  }
}

