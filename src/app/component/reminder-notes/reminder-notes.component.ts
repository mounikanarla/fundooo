import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.scss']
})

export class ReminderNotesComponent implements OnInit {

  constructor(private httpService: SignupService) { }
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
    this.httpService.getnote("/notes/getReminderNotesList", this.token).subscribe(data => {
      this.reminderArray = [];

      // console.log("get cards list successfull", data);
      var length = data['data'].data.length;
      // Initializing the for loop to store and print the cards in reverseorder      
      for (var i = length - 1; i >= 0; i--) {
        // console.log(data['data'].data.length);
        // Checking the condition that card is archived or not and it is pushing into array
        // if (data['data'].data[i].isDeleted == false) {
          this.reminderArray.push(data['data'].data[i]);
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
}
