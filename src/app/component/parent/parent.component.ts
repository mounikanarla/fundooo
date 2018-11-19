import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  public array = []
  token = localStorage.getItem('id');
  public pinarray=[]
  ngOnInit() {
    this.getCard();
    this.getpinCard();

  }
  addNewEntry(event) {
    if (event) {
      // this.array=[];
      this.getpinCard();
      this.getCard();
    }
  }
  /*
  * @description:getcard() is used to get the card data from database and it is prionting it in the array
  */
  getCard() {
    this.httpService.getnote("notes/getNotesList", this.token).subscribe(data => {
      this.array = [];

      // console.log("get cards list successfull", data);
      var length = data['data'].data.length;
      // Loop is initialized to the cards list in the reverse order 
      for (var i = length - 1; i >= 0; i--) {
        // console.log(data['data'].data.length);
        if (data['data'].data[i].isDeleted === false && data['data'].data[i].isArchived === false && data['data'].data[i].isPined === false ) {
          this.array.push(data['data'].data[i]);
        }
      }
      // console.log("array", this.array);
    })
  }

  getpinCard() {
    this.httpService.getnote("notes/getNotesList", this.token).subscribe(data => {
      this.pinarray = [];

      // console.log("get cards list successfull", data);
      var length = data['data'].data.length;
      // Loop is initialized to the cards list in the reverse order 
      for (var i = length - 1; i >= 0; i--) {
        // console.log(data['data'].data.length);
        if (data['data'].data[i].isPined === true && data['data'].data[i].isDeleted === false) {
          this.pinarray.push(data['data'].data[i]);
        }
      }
      // console.log("array", this.array);
    })
  }
  emit(event) {
    if (event) {
      this.getpinCard();
      this.getCard();
      // this.getpinCard();
    }
  }

}
