import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})

export class MoreComponent implements OnInit {
  token = localStorage.getItem('id');
  public body: any = {}
  public array = [];
  public check: boolean = true;
  public label;
  public notearray = [];
  constructor(private httpService: SignupService) { }
  @Input() noteid
  @Output() eventEmit = new EventEmitter();

  @Output() eventEmitLabel = new EventEmitter();
  accepted: Boolean;
  ngOnInit() {
    this.checkLabel();
    // console.log(this.noteid.noteLabels)
    // console.log(this.noteid[i].noteLabels.length)
    if (this.noteid != null) {
      for (var i = 0; i < this.noteid.noteLabels.length; i++) {
        this.notearray.push(this.noteid.noteLabels);
      }
      // console.log(this.notearray);
    }
  }
  delData() {
    console.log(this.noteid)
    var array = []
    array.push(this.noteid.id)
    this.httpService.delPost("notes/trashNotes", this.body = {
      "isDeleted": true,
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
        if(this.noteid.noteLabels.length>0)
        {
        for (var i = 0; i < this.array.length; i++) {
          for (var j = 0; j < this.noteid.noteLabels.length; j++) {
            if (this.array[i].id == this.noteid.noteLabels[j].id) {
              this.array[i].isChecked = true;
            }
          }
        }
      }
        console.log(this.array, "Label array printing successsss ");
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
      // console.log(label.isChecked)

      this.httpService.logoutPost("notes/" + this.noteid.id + "/addLabelToNotes/" + label.id + "/add", localStorage.getItem('id'))
        .subscribe((response) => {
          console.log("checklist added", response);
          this.eventEmit.emit({});

        },
          (error) => {
            console.log("error occured" + error)
          }
        )
    }
    if (this.noteid != null && label.isChecked == true) {
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
}