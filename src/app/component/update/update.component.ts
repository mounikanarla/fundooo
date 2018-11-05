import { Component, OnInit,Inject,EventEmitter,Output,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public title;
  public description;
  public token = localStorage.getItem('id');
  // public body: any = {}
  public id;
  public color;
  public bgcolor=this.data.color;
  public label;
  ngOnInit() {
  }
  constructor(private getService: SignupService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
    @Output() eventEmit = new EventEmitter();  
    @Input() colorid
    onClick(): void {
    this.dialogRef.close();
    this.update();
  }
update(){
    this.title = document.getElementById("title").innerHTML;
    this.description = document.getElementById("description").innerHTML;
    this.id=this.data.id;
    this.color=this.data.color
  this.getService.dataPost("notes/updateNotes", {
    "noteId": this.id,
    "title": this.title,
    "description": this.description,
    "color":this.color,
    // "label":this.arraylabel

  }, this.token).subscribe((response) => {
    console.log("successful", response);
    this.eventEmit.emit({});

    console.log(this.id);
      console.log(response);
  },
    (error) => {
      console.log(error);
    }
  )
}
emit(event){

  this.bgcolor=event
}
public arraylabel=[]
public labelevent=[]
eventEmitLabel(event) {
  console.log(event);
  // "label":this.arraylabel;

  // if(this.labelevent.indexOf(event)<0){
  //   this.labelevent.push(event);
  //   this.arraylabel.push(event.label);
  // }
  // else{
  //   this.arraylabel.splice(this.arraylabel.indexOf(event.label),1)
  //    this.labelevent.splice(this.labelevent.indexOf(event),1)
  // }

}
   
}
