import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  constructor(private httpService: SignupService, public snackBar: MatSnackBar) { }
 /*
  * @description: @INPUT AND @Output are decorators used to bind the data
  * @Input function is get the card Id
  * @Output function is emiting the event from the archive
  */
  @Input() noteid;
  @Output() eventEmit = new EventEmitter();
   /*
  * @description: Getting the data from the local storage
  */
  token = localStorage.getItem('id');
  public body: any = {}
  ngOnInit() {
  }
  /*
  * @description: archive() is used to get the data when the card is archived
  */
  archive() {
    console.log(this.noteid)
    var array = []
    array.push(this.noteid.id)
    //posting the data into archive notes by using the post service
    this.httpService.colorPost("notes/archiveNotes", this.body = {
      "isArchived": true,
      "noteIdList": array

    }, this.token).subscribe((response) => {
      // If the response is true the event will be emitted
      console.log("successful", response);
      this.eventEmit.emit({});
      console.log(this.eventEmit.emit({}))
      this.snackBar.open("Archived", "ok", {
        duration: 2000,
      });
    },
      (error) => {
        console.log("error", error);

      })
  }
}

