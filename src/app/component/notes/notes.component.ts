import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  outputs: ['onNewEntryAdded']

})
export class NotesComponent implements OnInit {

  constructor(private getService: SignupService, public route: ActivatedRoute, public router: Router) { }
  private press: boolean = true;
  @Output() eventEmit = new EventEmitter();  

  @Output() onNewEntryAdded = new EventEmitter();
  public title;
  public description;
  // public cardid=this.id;
  public isPinned = false;
  private id = localStorage.getItem('id');
  public body: any = {}
  public bgcolor="#FFFFFF";
  public label="";
  ngOnInit() {
  }
  toggleChild() {
    this.press = !this.press;
  }
  /*
  * @description: notes() is used to post the data that are getting from the user
  */
  notes() {
   var color=this.bgcolor;
   this.bgcolor='#ffffff'

    this.title = document.getElementById("title").textContent;
    this.description = document.getElementById("description").textContent;
    this.press = !this.press;
    
    console.log(this.title);
    console.log(this.description);
    console.log(this.id);
    // this.onNewEntryAdded.emit({});
  
    // post the data by passing the parameters
    this.getService.dataPost("notes/addnotes", this.body = {
      "title": this.title,
      "description": this.description,
      "checklist": "",
      "isPinned": false,
      "color": color,
      "labelIdList":JSON.stringify(this.arraylabel)
    }, this.id).subscribe((response) => {
      // If the response is true then the data will be emitted
      console.log("successful", response);
      console.log(this.id);
      this.getService.getnote("notes/getNotesList", this.id).subscribe((response) => {
        console.log(response);
        this.onNewEntryAdded.emit({});
        this.eventEmit.emit({});

      })

    },
      (error) => {
        console.log(error);

      }
    )
  }
  
  emit(event){
    this.bgcolor=event;

  }
  public arraylabel=[]
  public labelevent=[]
  eventEmitLabel(event){
    console.log(event);
    if(this.labelevent.indexOf(event)<0){
    this.labelevent.push(event);
    this.arraylabel.push(event.id);
  }
  else{
    this.arraylabel.splice(this.arraylabel.indexOf(event),1)
    this.labelevent.splice(this.labelevent.indexOf(event),1)
  }
  }

  removelabel(index,label)
  {
    // this.accepted = true;
    console.log(index.id)
    console.log(label.id);
    this.getService.logoutPost("notes/"+index.id+"/addLabelToNotes/"+label.id+"/remove",localStorage.getItem('id'))
    .subscribe((response)=>{
      console.log("checklist added"+response)
      this.eventEmit.emit({});},
    (error)=>{
      console.log("error occured"+error)
    }
  )
  }
}