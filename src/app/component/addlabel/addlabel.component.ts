import { Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/noteServices/note.service';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})
export class AddlabelComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpService: SignupService,private noteService: NoteService) { }
  @ViewChild('myLabel') myLabel: ElementRef;
  @ViewChild('myUpdate') myUpdate: ElementRef;
  @Output() eventEmit = new EventEmitter();
  press: boolean = true;
  public editClick = false;
  public editLabel;
  public editId;
  public editDoneIcon = true;
  public editable = false;
  public token=localStorage.getItem('id')
  ngOnInit() {
    this.getLabels();
  }
  toggleChild() {
    this.press = !this.press;

  }
  onClose(): void {
    this.dialogRef.close();
    this.addLabel()
    this.getLabels();
  }
  onClick(): void {
    this.addLabel()
    this.getLabels();
    this.myLabel.nativeElement.innerHTML = null;
  }
  public label;
  public labelArray = [];
  addLabel() {
    this.noteService.delLabel({
      "label": this.myLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": localStorage.getItem('userId')
    }, localStorage.getItem('id'))
      .subscribe(response => {
        // console.log("success in createpostlabel",response)
      },
        error => {
          // console.log("error in create postlabel",error)
        })
  }
  getLabels() {
    this.noteService.getLabelNote(this.token).subscribe(
      response => {
        this.labelArray = [];
        console.log(response['data'].details);
        for (var i = 0; i < (response['data'].details).length; i++) {
          if (response['data'].details[i].isDeleted == false) {
            this.labelArray.push(response['data'].details[i])
            // console.log(this.labelArray.push(response['data'].details[i].length));
          }
        }
        this.eventEmit.emit({});
        // console.log(this.labelArray,"Label array printing successsss ");
      },
      error => {
        // console.log("error in get LABELS",error);
      }
    )
  }
  delete(labelId) {
    // console.log(labelId)
    this.noteService.deleteLabel(labelId,this.token)
      .subscribe((response) => {
        // console.log("Deleted data",response);
        this.getLabels();
      }, (error) => {
        // console.log(error);
      });
  }
  edit(labelId) {
    this.editClick = true;
    this.editId = labelId.id;
    this.editLabel = labelId.label;
    this.editDoneIcon = false;
    this.editable = true;

  }

  update(labelId) {
    this.editClick = false;
    this.editDoneIcon = true;
    this.editable = false;
    // console.log(labelId)
    // console.log(this.myUpdate.nativeElement.innerHTML)
    // var str=this.myUpdate.nativeElement.innerHTML
    this.noteService.updateLabelPost(labelId,
      {
        "label": this.myUpdate.nativeElement.innerHTML,
        "isDeleted": false,
        "id": labelId.id,
        "userId": localStorage.getItem("userId")
      },this.token)
      .subscribe((response) => {
        // this.labelArray=[];
        this.getLabels();
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

}


