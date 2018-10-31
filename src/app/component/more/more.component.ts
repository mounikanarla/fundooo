import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})

export class MoreComponent implements OnInit {
  token = localStorage.getItem('id');
  public body: any = {}
  public array=[];
  public check: boolean=true;
  public label;
  constructor(private httpService: SignupService) { }
  @Input() noteid;
  @Output() eventEmit = new EventEmitter();

  // @Output() eventEmitLabel = new EventEmitter();
  accepted: Boolean;
  ngOnInit() {
    this.checkLabel();
  }
  delData() {
    console.log(this.noteid.id)
    var array = []
    array.push(this.noteid.id)
    this.httpService.delPost("notes/trashNotes", this.body = {
      "isDeleted": true,
      "noteIdList": array
    }, this.token).subscribe((response) => {
      this.eventEmit.emit({});
      console.log(this.eventEmit.emit())
      console.log("successful", response);
    },
      (error) => {
        console.log("error", error);
      }
    )
  }
  
  checkLabel() {
    this.httpService.getnote("noteLabels/getNoteLabelList",localStorage.getItem('id')).subscribe(
        response=>{
          this.array=[];
          this.array=response['data'].details;

          console.log(response['data'].details);
          for(var i=0;i<(response['data'].details).length;i++){
            this.array[i].isChecked==false;
            console.log(this.noteid[i].noteLabels)
            for(var j=0;j<this.noteid[i].noteLabels[i].length;j++){
            // if(response['data'].details[i].isDeleted == false){
            // this.array.push(response['data'].details[i])
            if(this.array[i].label==this.noteid.noteLabels[j].label){
              this.array[i].isChecked==true;
            }
            }
          }
          console.log(this.array,"Label array printing successsss ");
        },
        error=>{
          console.log("error in get LABELS",error);
        }
      )
    }
  addChecklabel(label)
  {
    // this.accepted = false;
    // if(this.noteid!=null && label.isChecked==true)
    // {
      this.check=!this.check;
      // label.ischecked==true;
    console.log(label.id);
    console.log(this.noteid);
    this.httpService.logoutPost("notes/"+this.noteid+"/addLabelToNotes/"+label.id+"/add",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added",response);
      this.eventEmit.emit({});
      // this.eventEmitLabel.emit(event);
      // (eventEmitLabel)="eventEmitLabel($event)"
    },
    (error)=>{
      console.log("error occured"+error)
    }
  )
  // }
  }
  
  removelabel(label)
  {
    // label.isChecked==false;
    // if(this.noteid=null && label.isChecked==false)
    // {
    // this.accepted = true;
    console.log(label);
    this.httpService.logoutPost("notes/"+this.noteid+"/addLabelToNotes/"+label.id+"/remove",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added"+response)
      this.eventEmit.emit({});},
    (error)=>{
      console.log("error occured"+error)
    }
  )
  // }
  }
}