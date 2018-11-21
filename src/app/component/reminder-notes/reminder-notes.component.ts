import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/noteServices/note.service';
import {NoteModel} from '../../core/models/note-model'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.scss']
})

export class ReminderNotesComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService:NoteService ) { }
  list:NoteModel[]=[]
  token = localStorage.getItem('id');
  public reminderArray=[]
  public sortedarray
  ngOnInit() {
    this.getReminder();
  }
  addNewEntry(event) {
    if (event) {
      // this.array=[];
      this.getReminder();

    }
  }
  getReminder() {
    this.noteService.getReminder()
    .pipe(takeUntil(this.destroy$))

    .subscribe(data => {
      this.reminderArray = [];

      // console.log("get cards list successfull", data);
     this.list= data['data'].data;
      // Initializing the for loop to store and print the cards in reverseorder      
      for (var i = this.list.length-1; i >= 0; i--) {
        // Checking the condition that card is archived or not and it is pushing into array
        // if (this.list[i].isDeleted === false) {
          this.reminderArray.push(this.list[i]);
          this.sortedarray = this.reminderArray.sort((a: any, b: any) =>
          new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
      );
        // }
      }
      // console.log("Reminder array", this.reminderArray);
    })
  }
  emit(event) {
    // console.log(event)
    if (event) {
      this.getReminder()
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
