import { Component, OnInit, Output, Input, EventEmitter,ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../core/services/noteServices/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  outputs: ['onNewEntryAdded']

})
export class NotesComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService:NoteService, public route: ActivatedRoute, public router: Router) { }
  // private press: boolean = true;
  // private click:boolean= true;
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;
  @Input() deleted
  @Output() eventEmit = new EventEmitter();

  @Output() onNewEntryAdded = new EventEmitter();
  
  public isPinned = false;
  public body: any = {}
  public bgcolor = "#FFFFFF";
  public isPined
  public label = "";
  public dataarray = [];
  public checklist = [];
  public status = "open"
  public listColor = "#ffffff";
  public press = false
  public check = false
  public isChecked = false;
  public  today = new Date();
  public  tomorrow=new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1, 8, 0, 0)
 

  // public isChecked=false;
  ngOnInit() {
  }


  /*
  * @description: notes() is used to post the data that are getting from the user
  */
  notes() {
    
    let color = this.bgcolor;
    this.bgcolor = '#ffffff'
    this.listColor='#ffffff'
   
    // this.title = document.getElementById("title").textContent;
    this.press = !this.press;
    
    // post the data by passing the parameters
    if (this.check == false) {
      // this.description = document.getElementById("description").textContent;

      this.noteService.noteAddingPost(this.body = {
        "title": this.title.nativeElement.innerHTML,
        "description": this.description.nativeElement.innerHTML,
        "isPined": "false",
        "color": color,
        "labelIdList": JSON.stringify(this.arraylabel),
        "reminder": this.array
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        // If the response is true then the data will be emitted
        // console.log("successful", response);
        // console.log(this.id);
        this.noteService.getNote()
        .pipe(takeUntil(this.destroy$))

        .subscribe((response) => {
          // console.log(response);
          this.array=[];
          this.arraylabel=[];
          this. labelevent = []
          this.onNewEntryAdded.emit({});
          this.eventEmit.emit({});

        })

      },
      )
    } else {
      for (let i = 0; i < this.dataarray.length; i++) {
        if (this.dataarray[i].isChecked == true) {
          this.status = "close"
        }
        let listObj = {
          "itemName": this.dataarray[i].data,
          "status": this.status
        }
        this.checklist.push(listObj);
        this.status = "open"
      }
      // this.checklist=this.dataarray;
      // console.log(this.checklist)
      this.noteService.noteAddingPost(this.body = {
        "title":  this.title.nativeElement.innerHTML,
        "checklist": JSON.stringify(this.checklist),
        "isPined": "false",
        "color": color,
        "labelIdList": JSON.stringify(this.arraylabel),
        "reminder": this.array
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        // If the response is true then the data will be emitted
        // console.log("successful", response);
        // console.log(this.id);
        this.noteService.getNote()
        .pipe(takeUntil(this.destroy$))

        .subscribe((response) => {
          // console.log(response);
          this.array=[];
          this.dataarray = [];
          this.arraylabel=[];
          this. labelevent = []
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
    this.isPined = event;
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
  eventEmitReminder(event){
    let value=event
    this.array=[];
    if(event)
    {
    this.array.push(value);
    // console.log(this.array)
    // console.log("event is emitting from notes");
    }
  }
  deleteReminder(index) {
    this.array.splice(this.array.indexOf(index), 1)
    // this.labelevent.splice(this.labelevent.indexOf(index), 1)
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
    this.noteService.removeLabelPost( index, label.id)
    .pipe(takeUntil(this.destroy$))

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
      let obj = {
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

 
  ondelete(deletedObj) {
    // console.log("ondelete fumction runnig");
    for (let i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
    // console.log(this.dataarray);

  }

  // editing(event, edited) {
  //   if (event.code == "Enter") {
  //     // console.log("enter pressed");
  //     for (let i = 0; i < this.dataarray.length; i++) {
  //       // if (edited.index == this.dataarray[i].index) {
  //         this.dataarray[i].data == edited.data
  //       // }
  //     }
  //     // console.log(this.dataarray);
  //   }
  // }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}





