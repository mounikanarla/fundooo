import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})

export class MoreComponent implements OnInit {
  token = localStorage.getItem('id');
  public body: any = {}

  constructor(private httpService: SignupService) { }
  @Input() noteid;

  @Output() eventEmit = new EventEmitter();

  ngOnInit() {
  }
  delData() {
    console.log(this.noteid)
    var array = []
    array.push(this.noteid)
    this.httpService.delPost("notes/trashNotes", this.body = {
      "isDeleted": true,
      "noteIdList": array
    }, this.token).subscribe((response) => {
      this.eventEmit.emit({});
      console.log(this.eventEmit.emit())
      console.log("successful", response);
    },
      (error) => {
        console.log("error", error);
      }
    )
  }
}