import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import {MatDialog} from '@angular/material/dialog';
import {TrashComponent} from '../trash/trash.component'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})

export class MoreComponent implements OnInit {
  show: boolean = true;
  token = localStorage.getItem('id');
  public body: any = {}
  public array = [];
  public check: boolean = true;
  public label;
  public notearray = [];
  public arraynotes:any
  public model:any

  constructor(private httpService: SignupService,public dialog: MatDialog,public snackBar: MatSnackBar) { }
  @Input() noteid
  @Input() deleted
  @Output() eventEmit = new EventEmitter();

  @Output() eventEmitLabel = new EventEmitter();
  accepted: Boolean;
  public isDeleted = false;
  ngOnInit() {
    if (this.noteid != undefined && this.noteid['isDeleted'] == true) {
      this.isDeleted = true
    }
    // console.log(this.noteid)
    
    this.checkLabel();

    // this.delData(this.flag)
  }
  delData(flag) {
    console.log(this.noteid)
    var array = []
    array.push(this.noteid.id)
    this.httpService.delPost("notes/trashNotes", this.body = {
      "isDeleted": flag,
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
    this.httpService.getnote("noteLabels/getNoteLabelList", localStorage.getItem('id')).subscribe(
      response => {
        this.array = response['data'].details;
        // console.log(this.noteid.noteLabels.length);
        
        if (this.noteid.noteLabels!= undefined) {
          for (var i = 0; i < this.array.length; i++) {
            for (var j = 0; j < this.noteid.noteLabels.length; j++) {
              if (this.array[i].id == this.noteid.noteLabels[j].id) {
                this.array[i].isChecked = true;
              }
            }
          }
        }
        // console.log(this.array, "Label array printing successsss ");
      },
      error => {
        console.log("error in get LABELS", error);
      }
    )
  }
  addChecklabel(label) {
    this.eventEmitLabel.emit(label);

    // console.log(this.eventEmitLabel.emit(label))

    if (this.noteid != null && label.isChecked == null) {
      // this.eventEmit.emit({});

      this.httpService.logoutPost("notes/" + this.noteid.id + "/addLabelToNotes/" + label.id + "/add", localStorage.getItem('id'))
        .subscribe((response) => {
          console.log("checklist added", response);
          this.eventEmit.emit({});
          console.log("event1", this.eventEmit.emit({}));

        },
          (error) => {
            console.log("error occured" + error)
          }
        )
    }
    if (this.noteid != null && label.isChecked == true) {
      // this.eventEmit.emit({});

      this.httpService.logoutPost("notes/" + this.noteid.id + "/addLabelToNotes/" + label.id + "/remove", localStorage.getItem('id'))
        .subscribe((response) => {
          console.log("checklist added" + response)
          this.eventEmit.emit({});
        },
          (error) => {
            console.log("error occured" + error)
          }
        )
    }
  }
    
deleteForever() {
  
    console.log(this.noteid)
    var array = []
    array.push(this.noteid.id)
      this.model = {
        "isDeleted": true,
        "noteIdList": array
      }
      console.log(this.model, "trash");
      this.httpService.delPost('notes/deleteForeverNotes', this.model,localStorage.getItem('id')).subscribe(response => {
        console.log(response, "success");
        this.eventEmit.emit({});
        
        this.snackBar.open("Deleted Note Permanently", "trash", {
          duration: 10000,
        });
      }),
        error => {
          console.log(error, "error occured in trash");
        }
   
}


}