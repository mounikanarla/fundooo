import { Component, OnInit,Inject,ElementRef,ViewChild } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data:any ,private httpService: SignupService,) {}
  @ViewChild('myLabel') myLabel:ElementRef;
    ngOnInit() {
    this.getLabels();
  }

  onClose():void{
this.dialogRef.close();
this.addLabel()
this.getLabels();
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
      console.log(this.labelArray,"Label array printing successsss ");
    },
    error=>{
      console.log("error in get LABELS",error);
    }
  )
}
delete(labelId){
  console.log(labelId)
  this.httpService.deleteLabel("/noteLabels/"+labelId+"/deleteNoteLabel")
  .subscribe((response) =>{
    console.log("Deleted data",response);
    this.getLabels();
  },(error) => {
    console.log(error);
  });
}

update(labelId){ 
  var label=this.myLabel.nativeElement.innerHTML;
  console.log(label)
  this.httpService.delPost("/noteLabels/"+labelId+"/updateNoteLabel",
  {
    "label":label
  },localStorage.getItem('id'))
  .subscribe((response) =>{
    this.getLabels();
    console.log(response);
  },(error) => {
    console.log(error);
  });
}


}


