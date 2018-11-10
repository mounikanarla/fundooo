import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { DataServiceService } from '../../core/services/dataServices/data-service.service';


@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  constructor(private httpService: SignupService, public dialog: MatDialog,private data: DataServiceService) { }
  public array = [];
  token = localStorage.getItem('id');
  public condition=false;

  /*
  * @description: @INPUT AND @Output are decorators used to bind the data
  */
 @Input() noteid
  @Input() newData;
  @Input() searchInput;
  @Output() eventEmit = new EventEmitter();
  //  @Output() 
  /*
  * @description:ngOnInit is used for all the initialization/declaration and avoid stuff to work in the 
  */
  ngOnInit() {
    if (this.newData != null && this.newData.isDeleted == true) {

    }
    this.data.currentMessage1.subscribe(message => {
      this.condition = message;
      console.log(this.condition)
    }
    )

  
    
  }
  /*
  * @description : emit(event) is used to emit the event coming from child component at the time of action
  */
  emit(event) {
    console.log(event)
    if (event) {
      this.eventEmit.emit({});
      console.log("event2", this.eventEmit.emit({}));

    }
  }
  openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {

      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventEmit.emit({});

    });

  }
  labelEmit(event) {
    console.log(event)
    if (event) {
      this.eventEmit.emit({});

    }
  }
  eventEmitLabel(event) {
    if (event) {
      this.eventEmit.emit(event)
      // console.log("event2",event);
    }
  }
  removelabel(index, label) {
    // this.accepted = true;
    console.log(index)
    console.log(label);
    this.httpService.logoutPost("notes/" + index.id + "/addLabelToNotes/" + label.id + "/remove", localStorage.getItem('id'))
      .subscribe((response) => {
        console.log("checklist added" + response)
        this.eventEmit.emit({});
      },
        (error) => {
          console.log("error occured" + error)
        }
      )
  }
  // updatelist(id){
  //   var apiData = {
  //     "itemName": this.modifiedCheckList.itemName,
  //     "status": this.modifiedCheckList.status
  //   }
  //   var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
  //   this.service.postDel(url, JSON.stringify(apiData), localStorage.getItem('id')).subscribe(response => {
  //     console.log(response);

  //   })
  // }
  removeRemainder(label) {
    var id =[];
    id.push(label)
    var body={
      "noteIdList" : id
    }
    this.httpService.delPost("/notes/removeReminderNotes",body, localStorage.getItem('id'))
      .subscribe((response) => {
        console.log("Reminder deleted" + response)
        this.eventEmit.emit({});
      },
        (error) => {
          console.log("error occured" + error)
        }
      )
  }
}
