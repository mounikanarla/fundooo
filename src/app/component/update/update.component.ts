import { Component, OnInit,Inject,EventEmitter,Output,Input, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NoteService } from '../../core/services/noteServices/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
    this.label=this.data.noteLabels;
    if (this.data.noteCheckLists.length>0){
      this.checklist=true;
    }
    this.tempArray=this.data.noteCheckLists;
    this.array=this.data.reminder
    console.log()

  }
  constructor(private noteService:NoteService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
    @Output() eventEmit = new EventEmitter();  
    @Input() colorid
    
    onClick(): void {
      this.dialogRef.close();
      if(this.modifiedCheckList==null){
        this.update();

      }
    }
update(){
    this.title = document.getElementById("title").innerHTML;
    this.description = document.getElementById("description").innerHTML;
    this.id=this.data.id;
    this.color=this.data.color
    this.eventEmit.emit(event);

    console.log(this.color)
  if(this.checklist==false)
  {

  this.noteService.noteUpdate( {
    "noteId": this.id,
    "title": this.title,
    "description": this.description,
    "color":this.color,
    "label":this.label,
    "reminder":this.array

  })
  .pipe(takeUntil(this.destroy$))

  .subscribe((response) => {
    // console.log("successful", response);
    this.eventEmit.emit({});
  })
}else{

  var apiData={
    "itemName": this.modifiedCheckList.itemName,
    "status":this.modifiedCheckList.status
}
//  var url = "notes/" +this.data.id+ "/checklist/" + this.modifiedCheckList.id + "/update";
 this.noteService.updateCheckbox(this.data.id,this.modifiedCheckList.id ,JSON.stringify(apiData)).subscribe(response => {
  //  console.log(response);
 })

}
}
editing(editedList,event){
      
  // console.log(editedList);
  if(event.code=="Enter"){
  this.modifiedCheckList=editedList;
  this.update();

  }
}
checkBox(checkList){
    
  if(checkList.status=="open"){
    checkList.status = "close"
  }
  else{
    checkList.status = "open"
  }
  // console.log(checkList);
  this.modifiedCheckList=checkList;

  this.update();
}
public removedList;
  removeList(checklist){
    // console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    // var url = "notes/" + this.data.id + "/checklist/" + this.removedList.id + "/remove";

    this.noteService.removeCheckList(this.data,this.removedList)
    .pipe(takeUntil(this.destroy$))

    .subscribe((response)=>{
      // console.log(response);
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
  
      // var url = "notes/" + this.data.id + "/checklist/add";

    this.noteService.addCheckList(this.data,this.newData)
    .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
      // console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      LoggerService.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)

      // console.log(this.tempArray)

    })
  }
  }
emit(event){

  this.bgcolor=event
}

eventEmitLabel(event) {
  // console.log(event);
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
public array=[]
  eventEmitRemainder(event){
    var flag=false,index;
    this.array=[];
    if(event)
    {
      flag=true;
      index=1;
    this.array.push(event);
    // console.log(this.array)
    // console.log("event receiving");
    }
    if(flag==true){
      this.array.splice(index,1)
    }
  }
removelabel(data, label) {
  
  this.noteService.removeLabelPost(data, label)
  .pipe(takeUntil(this.destroy$))

    .subscribe((response) => {
      // console.log("checklist removed" + response)
      this.eventEmit.emit({});
    },
      (error) => {
        // console.log("error occured" + error)
      }
    )
}
removeRemainder(label) {
  // console.log(label);
  
  var id =[];
  id.push(label)

  var body={
    "noteIdList" : id
  }
  this.noteService.removeRemainPost(body)
  .pipe(takeUntil(this.destroy$))

    .subscribe((response) => {
     LoggerService.log("Reminder deleted" + response)
      this.eventEmit.emit({});
    },
      (error) => {
        // console.log("error occured" + error)
      }
    )
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
