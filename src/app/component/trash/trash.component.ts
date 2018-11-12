import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  public array = []
  token = localStorage.getItem('id');

  ngOnInit() {
      this.trash();
  }
trash(){
  this.httpService.getnote("notes/getTrashNotesList", this.token).subscribe(data => {
    this.array = [];

    console.log("get cards list successfull", data);
    var length = data['data'].data.length;

    for (var i = length - 1; i >= 0; i--) {
      console.log(data['data'].data.length);
      // if (data['data'].data[i].isArchived == true)
      {
        this.array.push(data['data'].data[i]);
      }
    }
    console.log("archive array", this.array);
  })
}
emit(event){
  console.log(event)
  if(event){
    this.trash();
  }
}
}
