import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  constructor(private httpService: SignupService, public snackBar: MatSnackBar) { }
  @Input() noteid;
  @Input() Pin;
  // @Input() note
  @Output() eventEmit = new EventEmitter();
   /*
  * @description: Getting the data from the local storage
  */
 public isPined=false;
 public isDeleted=false;
  token = localStorage.getItem('id');
  public body: any = {}
  ngOnInit() {
    // this.archive(this.flag)
  if(this.noteid!= undefined && this.noteid.isDeleted == true){
    this.isDeleted=true
  }
  if(this.noteid!= undefined && this.noteid.isPined== true){
    this.isPined=true
  }
  }
  pin(flag) {
    this.eventEmit.emit({});
    console.log(event);
    
    if(this.noteid!=undefined){
      // this.isPined=true

    
    console.log(this.noteid)
    var array = []
    array.push(this.noteid.id)
    //posting the data into pin notes by using the post service
    this.httpService.colorPost("/notes/pinUnpinNotes", this.body = {
      "isPined": flag,
      "noteIdList": array

    }, this.token).subscribe((response) => {
      // If the response is true the event will be emitted
      console.log("successful", response);
      this.eventEmit.emit({});
      console.log(this.eventEmit.emit({}))
      if(flag==true)
      {
      this.snackBar.open("Pinned", "ok", {
        duration: 2000,
      });
      }
      else{
        this.snackBar.open("UnPinned", "ok", {
          duration: 2000,
        });
      }
    },
      (error) => {
        console.log("error", error);

      })
  }
}
}
