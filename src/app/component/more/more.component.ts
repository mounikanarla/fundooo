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
  
  constructor(private httpService: SignupService) { }
  @Input() noteid;

  @Output() eventEmit = new EventEmitter();
  @Output() eventEmitLabel = new EventEmitter();

  ngOnInit() {
    this.checkLabel();
  }
  delData() {
    console.log(this.noteid)
    var array = []
    array.push(this.noteid)
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
          // this.array=[];
          console.log(response['data'].details);
          for(var i=0;i<(response['data'].details).length;i++){
            if(response['data'].details[i].isDeleted == false){
            this.array.push(response['data'].details[i])
            // console.log(this.labelArray.push(response['data'].details[i].length));
            }
          }
          console.log(this.array,"Label array printing successsss ");
        },
        error=>{
          console.log("error in get LABELS",error);
        }
      )
    }
    // console.log(data.id);
  addChecklabel(label)
  {
    this.eventEmitLabel.emit(label.id);
    console.log(label.id);
    console.log(this.noteid);
    
    // if(this.noteid != null)
    // {
    this.httpService.logoutPost("notes/"+this.noteid+"/addLabelToNotes/"+label.id+"/add",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added",response);
      // this.eventEmit.emit();

    },
    (error)=>{
      console.log("error occured"+error)
    }
  )
// }
  }
  
  removelabel(label)
  {
    console.log(label);
    this.httpService.logoutPost("notes/"+this.noteid+"/addLabelToNotes/"+label.id+"/remove",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added"+response)
    },
    (error)=>{
      console.log("error occured"+error)
    }
  )
  }
}