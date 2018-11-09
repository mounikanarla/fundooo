import { Component, OnInit,Inject,EventEmitter,Output,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from '../../core/services/http/http.service'

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
  public checkLabels
  ngOnInit() {
    console.log("checkingdata",this.data.notelabels)
    this.label=this.data.noteLabels;
    
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
    "label":this.label

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

eventEmitLabel(event) {
  console.log(event);
  var flag=false,index;
  for(var i=0;i<this.label.length;i++){
    if(event.id==this.label[i].id){
      flag=true;
      index=i;
    }
  }
  if(flag==true){
    this.label.splice(index,1)
  }
  else{
    this.label.push(event);
  }
 

}
removelabel(data, label) {
  // this.accepted = true;
  // console.log(data)
  // console.log(label);
  this.getService.logoutPost("notes/" + data.id + "/addLabelToNotes/" + label.id + "/remove", localStorage.getItem('id'))
    .subscribe((response) => {
      console.log("checklist removed" + response)
      this.eventEmit.emit({});
    },
      (error) => {
        console.log("error occured" + error)
      }
    )
}
}
