import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  outputs: ['onNewEntryAdded']

})
export class NotesComponent implements OnInit {

  constructor(private getService: SignupService, public route: ActivatedRoute, public router: Router) { }
  // private press: boolean = true;
  // private click:boolean= true;

  @Output() eventEmit = new EventEmitter();

  @Output() onNewEntryAdded = new EventEmitter();
  public title;
  public description;
  // public cardid=this.id;
  public isPinned = false;
  private id = localStorage.getItem('id');
  public body: any = {}
  public bgcolor = "#FFFFFF";
  public notepin
  public label = "";
  public dataarray = [];
  public checklist = [];
  public status = "open"
  public listColor = "#ffffff";
  public press = false
  public check = false
  public isChecked = false;

  // public isChecked=false;
  ngOnInit() {
  }


  /*
  * @description: notes() is used to post the data that are getting from the user
  */
  notes() {
    
    var color = this.bgcolor;
    this.bgcolor = '#ffffff'

    this.title = document.getElementById("title").textContent;
    this.press = !this.press;
    // console.log(this.title);
    // console.log(this.description);
    // console.log(this.id);

    // post the data by passing the parameters
    if (this.check == false) {
      this.description = document.getElementById("description").textContent;

      this.getService.dataPost("notes/addnotes", this.body = {
        "title": this.title,
        "description": this.description,
        "isPined": "false",
        "color": color,
        "labelIdList": JSON.stringify(this.arraylabel),
        "reminder": this.array
      }, this.id).subscribe((response) => {
        // If the response is true then the data will be emitted
        // console.log("successful", response);
        // console.log(this.id);
        this.getService.getnote("notes/getNotesList", this.id).subscribe((response) => {
          // console.log(response);
          this.array=[];
          this.onNewEntryAdded.emit({});
          this.eventEmit.emit({});

        })

      },
      )
    } else {
      for (var i = 0; i < this.dataarray.length; i++) {
        if (this.dataarray[i].isChecked == true) {
          this.status = "close"
        }
        var listObj = {
          "itemName": this.dataarray[i].data,
          "status": this.status
        }
        this.checklist.push(listObj);
        this.status = "open"
      }
      // this.checklist=this.dataarray;
      // console.log(this.checklist)
      this.getService.dataPost("notes/addnotes", this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.checklist),
        "isPined": "false",
        "color": color,
        "labelIdList": JSON.stringify(this.arraylabel),
        "reminder": this.array
      }, this.id).subscribe((response) => {
        // If the response is true then the data will be emitted
        // console.log("successful", response);
        // console.log(this.id);
        this.getService.getnote("notes/getNotesList", this.id).subscribe((response) => {
          // console.log(response);
          this.array=[];
          this.dataarray = [];
          this.onNewEntryAdded.emit({});
          this.eventEmit.emit({});

        })

      },
      )

    }

  }
  public remindevent = []

  emit(event) {
    this.bgcolor = event;
    this.listColor = event;
    this.notepin = true;
    // this.remindevent=event;
    // console.log(this.notepin)
  }
  public arraylabel = []
  public labelevent = []
  eventEmitLabel(event) {
    // console.log(event);
    if (this.labelevent.indexOf(event) < 0) {
      this.labelevent.push(event);
      this.arraylabel.push(event.id);
    }
    else {
      this.arraylabel.splice(this.arraylabel.indexOf(event), 1)
      this.labelevent.splice(this.labelevent.indexOf(event), 1)
    }
  }
  public array=[]
  eventEmitRemainder(event){
    this.array=[];
    if(event)
    {
    this.array.push(event);
    console.log(this.array)
    console.log("event is emitting from notes");
    }
  }

  // public labelName=[];
  // public labelId=[]
  deleteLabel(index) {
    this.arraylabel.splice(this.arraylabel.indexOf(index), 1)
    this.labelevent.splice(this.labelevent.indexOf(index), 1)
  }
  removelabel(index, label) {
    // this.accepted = true;
    console.log(index.id)
    console.log(label.id);
    this.getService.logoutPost("notes/" + index.id + "/addLabelToNotes/" + label.id + "/remove", localStorage.getItem('id'))
      .subscribe((response) => {
        // console.log("checklist added" + response)
        this.eventEmit.emit({});
      },
        (error) => {
          // console.log("error occured" + error)
        }
      )
  }
  public data;
  public i = 0;
  public adding = false;
  public addCheck = false;

  enter(event) {
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    this.i++;
    this.isChecked = this.addCheck
    if (this.data != null && event.code == "Enter") {
      console.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked": this.isChecked
      }
      this.dataarray.push(obj)
      console.log(this.dataarray);
      this.data = null;
      this.adding = false;
      this.isChecked = false;
      this.addCheck = false;
    }
  }

  // onenter():void{
  //   this.enter();
  //   this.dataarray=[];

  // }
  ondelete(deletedObj) {
    // console.log("ondelete fumction runnig");
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
    // console.log(this.dataarray);

  }

  editing(event, edited) {
    if (event.code == "Enter") {
      // console.log("enter pressed");
      for (var i = 0; i < this.dataarray.length; i++) {
        if (edited.index == this.dataarray[i].index) {
          this.dataarray[i].data == edited.data
        }
      }
      // console.log(this.dataarray);
    }
  }
}
