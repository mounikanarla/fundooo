import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-main-archive',
  templateUrl: './main-archive.component.html',
  styleUrls: ['./main-archive.component.css']
})
export class MainArchiveComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  public archiveArray = []
  token = localStorage.getItem('id');
  @Output() eventEmit = new EventEmitter();  
  ngOnInit() {
    this.getarchive()
  }
  /*
  * @description: getarchive() is used to get the archived datalist and is printing into the array
  */
  getarchive() {
    this.httpService.getnote("notes/getArchiveNotesList", this.token).subscribe(data => {
      this.archiveArray = [];

      console.log("get cards list successfull", data);
      var length = data['data'].data.length;
      // Initializing the for loop to store and print the cards in reverseorder      
      for (var i = length - 1; i >= 0; i--) {
        console.log(data['data'].data.length);
        // Checking the condition that card is archived or not and it is pushing into array
        if (data['data'].data[i].isArchived == true) {
          this.archiveArray.push(data['data'].data[i]);
        }
      }
      console.log("archive array", this.archiveArray);
    })
  }
  emit(event){
    console.log(event)
    if(event){
      this.getarchive()
    }
  }
}
