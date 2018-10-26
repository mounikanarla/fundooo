import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  public array = []
  token = localStorage.getItem('id');

  ngOnInit() {
      this.httpService.getnote("notes/getTrashNotesList", this.token).subscribe(data => {
        this.array = [];
  
        console.log("get cards list successfull", data);
        var length = data['data'].data.length;
  
        for (var i = length - 1; i >= 0; i--) {
          console.log(data['data'].data.length);
          {
            this.array.push(data['data'].data[i]);
          }
        }
        console.log("archive array", this.array);
      })
    }
  

}
