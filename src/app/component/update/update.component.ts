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
  public checkLabels;
  public modifiedCheckList;
  public tempArray=[];
  public newList;
  public newData:any={}
  public checklist=false;

  ngOnInit() {
    console.log("checkingdata",this.data.notelabels)
    this.label=this.data.noteLabels;
    if (this.data.noteCheckLists.length>0){
      this.checklist=true;
    }
    this.tempArray=this.data.noteCheckLists;

    
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
  if(this.checklist==false){

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
  }
  
  )
}else{
  var apiData={
    "itemName": this.modifiedCheckList.itemName,
    "status":this.modifiedCheckList.status
}
 var url = "notes/" +this.data.id+ "/checklist/" + this.modifiedCheckList.id + "/update";
 this.getService.delPost(url, JSON.stringify(apiData), localStorage.getItem('id')).subscribe(response => {
   console.log(response);
 })

}
}
editing(editedList,event){
      
  console.log(editedList);
  if(event.code=="Enter"){
  this.modifiedCheckList=editedList;
  this.update();
  }
}
checkBox(checkList){
    
  if (checkList.status=="open"){
    checkList.status = "close"
  }
  else{
    checkList.status = "open"
  }
  console.log(checkList);
  this.modifiedCheckList=checkList;
  this.update();
}
public removedList;
  removeList(checklist){
    console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "notes/" + this.data.id + "/checklist/" + this.removedList.id + "/remove";

    this.getService.delPost(url,null,localStorage.getItem('id')).subscribe((response)=>{
      console.log(response);
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
  public adding=false;
  public addCheck=false;
  public status="open"
  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }
  
      var url = "notes/" + this.data.id + "/checklist/add";

    this.getService.delPost(url, this.newData, localStorage.getItem('id'))
    .subscribe(response => {
      console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      console.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)

      console.log(this.tempArray)

    })
  }
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
