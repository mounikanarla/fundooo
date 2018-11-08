import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.css']
})
export class ChangecolorComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  token = localStorage.getItem('id');
  /*
    * @description: @INPUT AND @Output are decorators used to bind the data
    * @Input function is get the card Id
    * @Output function is emiting the event from the archive
    */
  //  public bgcolor="#FFFFFF"

  @Input() colorid;
  public body: any = {}
  @Output() eventEmit = new EventEmitter();
  public isDeleted = false;

  ngOnInit() {
    if (this.colorid != undefined && this.colorid.isDeleted == true) {
      this.isDeleted = true
    }
  }
  /*
  * @description: changeColor() is used to get the colour when the button of the colour is clicked
  */
  changeColor(color) {
    // color=this.bgcolor;
    this.eventEmit.emit(color);
    // console.log(this.colorid)
    var array = []
    array.push(this.colorid.id)
    // posting the clicked colour and id of cards into array
    this.httpService.colorPost("notes/changesColorNotes", this.body = {
      "color": color,
      "noteIdList": array
    }, this.token).subscribe((response) => {
      // console.log(  this.onEmit.emit() )
      // console.log("successful", response);
      this.eventEmit.emit({});
    },
      (error) => {
        // console.log("error", error);
      })
  }
}
