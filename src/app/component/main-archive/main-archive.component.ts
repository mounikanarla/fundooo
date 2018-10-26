import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.getarchive()
  }
  getarchive() {
    this.httpService.getnote("notes/getArchiveNotesList", this.token).subscribe(data => {
      this.archiveArray = [];

      console.log("get cards list successfull", data);
      var length = data['data'].data.length;

      for (var i = length - 1; i >= 0; i--) {
        console.log(data['data'].data.length);
        if (data['data'].data[i].isArchived == true) {
          this.archiveArray.push(data['data'].data[i]);
        }
      }
      console.log("archive array", this.archiveArray);
    })
  }
  
}
