import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _moment1 from 'moment';
import { SignupService } from '../../core/services/http/http.service';

// import {default as _rollupMoment} from 'moment';

const moment = _moment1 || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class ReminderComponent implements OnInit {
  date = new FormControl(moment());
  public body:any={}
  public flag=false;
  public isDeleted=false;
  public myDate: any={
  "date":"",
  "time":""
}
  public value;
  public currentDate;
  public obj;

  constructor(private httpService: SignupService) { }
@Input() noteid
@Output() eventEmit = new EventEmitter();
@Output() eventEmitReminder = new EventEmitter();


  ngOnInit() {
    if(this.noteid!=undefined && this.noteid.isDeleted==true){
      this.isDeleted=true
    }
  }
  
  
  remindToday(){

    let currentDate = new Date()
    var date=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
    this.eventEmitReminder.emit(date);
    if(this.noteid!=null){
    this.body =
      {
        'noteIdList': [this.noteid.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
      }
    this.httpService.delPost('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('id'))
      .subscribe(data => {
        console.log("success in today reminders",data);
        this.eventEmit.emit({});
        console.log("event emitting");

      },
        error => {
          console.log("error in today reminders",error)
        })
      }
  }
  remindTomorrow(){
    let currentDate = new Date();
    var date=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)

    this.eventEmitReminder.emit(date);

    if(this.noteid!=null){

    this.body =
      {
        'noteIdList': [this.noteid.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.httpService.delPost('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('id'))
      .subscribe(data => {
        console.log("success in tomorrow reminders",data);
        this.eventEmit.emit({});
        // this.eventEmitReminder.emit(date);

      },
        error => {
          console.log("error in tomorrow reminders",error)
        })
      }
  }

  weekRemainder(){

    let currentDate = new Date()
    var date=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)

    this.eventEmitReminder.emit(date);

    if(this.noteid!=null)
    {
    this.body =
      {
        'noteIdList': [this.noteid.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.httpService.delPost('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('id'))
      .subscribe(data => {
        console.log("success in week reminders",data);
        this.eventEmit.emit({});
        // this.eventEmitReminder.emit(date);

  
      },
        error => {
          console.log("error in week reminders",error)
     })
  }
}

reminder(){
  this.value=this.currentDate;
  if(this.noteid.reminder.length!=0)
  {
    var reminder=new Date(this.noteid.reminder);
    var form=new FormControl(reminder);
    this.value=form.value
    this.obj.date=this.value
    this.value=reminder;
  }
  // this.myDate.date=this.value;
  
}
customDate(){
//  var date=new Date(this.value.date.getFullYear(),this.value.date.getMonth(),this.value.date.getDate())
//  this.eventEmitReminder.emit(date);

 if(this.noteid!=null)
 {
 this.body =
   {
     'noteIdList': [this.noteid.id],
     'reminder': new Date(this.myDate.date.getFullYear(),this.myDate.date.getMonth(),this.myDate.date.getDate())
   }
 this.httpService.delPost('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('id'))
   .subscribe(data => {
     console.log("success in week reminders",data);
     this.eventEmit.emit({});
     // this.eventEmitReminder.emit(date);


   },
     error => {
       console.log("error in week reminders",error)
  })
}


}
}

