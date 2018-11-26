import { Component, OnInit,Inject,EventEmitter,Output,Input, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NoteService } from '../../core/services/noteServices/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddCollaboratorsComponent } from '../add-collaborators/add-collaborators.component';

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
  constructor(private noteService:NoteService,public dialog: MatDialog,
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
    "reminder":this.array,
    "collaberators":this.data.collaborators
  })
  .pipe(takeUntil(this.destroy$))

  .subscribe((response) => {
    LoggerService.log("successful", response);
    this.eventEmit.emit({});
  })
}else{

  var apiData={
    "itemName": this.modifiedCheckList.itemName,
    "status":this.modifiedCheckList.status
}
 this.noteService.updateCheckbox(this.data.id,this.modifiedCheckList.id ,JSON.stringify(apiData))
 .subscribe((response)=>{
  LoggerService.log('api hit sucessfull');
},
(error)=>{
  LoggerService.log('failed');
})
}
}
editing(editedList,event){
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
  LoggerService.log(checkList);
  this.modifiedCheckList=checkList;

  this.update();
}
public removedList;
  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    this.noteService.removeCheckList(this.data,this.removedList)
    .pipe(takeUntil(this.destroy$))

    .subscribe((response)=>{
      // LoggerService.log(response);
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
    this.noteService.addCheckList(this.data,this.newData)
    .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      LoggerService.log(response['data'].details);
      this.tempArray.push(response['data'].details)
    })
  }
  }
emit(event){
  this.bgcolor=event
}

eventEmitLabel(event) {
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
    }
    if(flag=true){
      this.array.splice(index,1)
    }
  }
removelabel(data, label) {
  
  this.noteService.removeLabelPost(data, label)
  .pipe(takeUntil(this.destroy$))

    .subscribe((response) => {
      LoggerService.log("checklist removed" + response)
      this.eventEmit.emit({});
    },
      (error) => {
        LoggerService.log("error occured" + error)
      }
    )
}
removeRemainder(label) {
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
        LoggerService.log("error occured" + error)
      }
    )
}
openDialog(): void {
  const dialogRef = this.dialog.open(AddCollaboratorsComponent,{
  data: this.data
  });
  dialogRef.afterClosed()
    .subscribe(result => {
    console.log('The dialog was closed');
    this.eventEmit.emit({});

   });
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
