import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../core/services/dataServices/data-service.service';
import { SignupService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  message: string
  constructor(private data: DataServiceService, private httpService: SignupService) { }
  public array = [];
  ngOnInit() {
    this.getCard()
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      console.log(this.message)
    }
    )
    // this.data.changeView.subscribe(message=>{

    // })

  }
  getCard() {
    this.httpService.getnote("notes/getNotesList", localStorage.getItem('id')).subscribe(data => {
      this.array = [];

      console.log("get cards list successfull", data);
      var length = data['data'].data.length;
      // Loop is initialized to the cards list in the reverse order 
      for (var i = length - 1; i >= 0; i--) {
        console.log(data['data'].data.length);
        if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false) {
          this.array.push(data['data'].data[i]);
        }
      }
      console.log("array", this.array);
    })
  }
}
