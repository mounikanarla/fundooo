import { Component, OnInit,Inject,ElementRef,ViewChild,Output, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.css']
})
export class AddlabelComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<AddlabelComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any ,private httpService: SignupService) {}
  @ViewChild('myLabel') myLabel:ElementRef;
  @ViewChild('myUpdate') myUpdate:ElementRef;
  @Output() eventEmit = new EventEmitter();  

  press: boolean = true;
  // editlabel:boolean=true;
  editClick=false;
  editLabel;
  editId;
  editDoneIcon=true;
  editable=false;
    ngOnInit() {
    this.getLabels();
  }
  toggleChild() {
    this.press=!this.press;
    
  }

  onClose():void{
  this.dialogRef.close();
  this.addLabel()
  this.getLabels();
  }
  onClick():void{
    this.addLabel()
    this.getLabels();
    this.myLabel.nativeElement.innerHTML=null;
  }
  public label;
  public labelArray=[];
  addLabel(){

    // console.log(this.myDiv.nativeElement.innerHTML);
    this.httpService.delPost("noteLabels",{
      "label":this.myLabel.nativeElement.innerHTML,
      "isDeleted":false,
      "userId":localStorage.getItem('userId')
    },localStorage.getItem('id')).subscribe(response=>{
      console.log("success in createpostlabel",response)
    },
    error=>{
      console.log("error in create postlabel",error)
    })
  }
getLabels(){
 
  this.httpService.getnote("noteLabels/getNoteLabelList",localStorage.getItem('id')).subscribe(
    response=>{
      this.labelArray=[];
      console.log(response['data'].details);
      for(var i=0;i<(response['data'].details).length;i++){
        if(response['data'].details[i].isDeleted == false){
        this.labelArray.push(response['data'].details[i])
        // console.log(this.labelArray.push(response['data'].details[i].length));
        }
      }
      this.eventEmit.emit({});
      console.log(this.labelArray,"Label array printing successsss ");
    },
    error=>{
      console.log("error in get LABELS",error);
    }
  )
}
delete(labelId){
  console.log(labelId)
  this.httpService.deleteLabel("/noteLabels/"+labelId+"/deleteNoteLabel",localStorage.getItem('id'))
  .subscribe((response) =>{
    console.log("Deleted data",response);
    this.getLabels();
  },(error) => {
    console.log(error);
  });
}
edit(labelId){
  this.editClick=true;
  this.editId=labelId.id;
  this.editLabel=labelId.label;
  this.editDoneIcon=false;
  this.editable=true;
 
}

update(labelId){ 
  this.editClick=false;
  this.editDoneIcon=true;
  this.editable=false;
  console.log("edit function");
  console.log(labelId)
  console.log(this.myUpdate.nativeElement.innerHTML)
  // var str=this.myUpdate.nativeElement.innerHTML
  this.httpService.delPost("noteLabels/"+labelId.id+"/updateNoteLabel",
  {
    "label":this.myUpdate.nativeElement.innerHTML,
    "isDeleted":false,
    "id":labelId.id,
    "userId":localStorage.getItem("userId")
  },localStorage.getItem('id'))
  .subscribe((response) =>{
    // this.labelArray=[];
    this.getLabels();
    console.log(response);
  },(error) => {
    console.log(error);
  });
}
// emit(event){
//   this.getLabels();
// }

}


