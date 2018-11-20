import { Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/noteServices/note.service';
import{ NoteModel } from '../../core/models/note-model'
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/takeUntil';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})
export class AddlabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private noteService: NoteService) { }
  @ViewChild('myLabel') myLabel: ElementRef;
  @ViewChild('myUpdate') myUpdate: ElementRef;
  @Output() eventEmit = new EventEmitter();
  list:NoteModel[]=[]
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
    try{
        this.noteService.delLabel({
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": localStorage.getItem('userId')
    })
    .pipe(takeUntil(this.destroy$))

      .subscribe(response => {
        LoggerService.log("success in createpostlabel",response)
      })
    }catch (err) {
        if (err instanceof ReferenceError
            || err instanceof TypeError
            || err instanceof SyntaxError
            || err instanceof RangeError) {
              LoggerService.log("Something bad happened in add label",err);
            }
      }
  }
  getLabels() {
    this.noteService.getLabelNote()
    .pipe(takeUntil(this.destroy$))

    .subscribe(
      response => {
        this.labelArray = [];
        // console.log(response['data'].details);
        this.list=response['data'].details
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].isDeleted == false) {
            this.labelArray.push(this.list[i])
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
    .pipe(takeUntil(this.destroy$))

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
      })
      .pipe(takeUntil(this.destroy$))

      .subscribe((response) => {
        // this.labelArray=[];
        this.getLabels();
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


