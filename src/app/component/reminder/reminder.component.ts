import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _moment1 from 'moment';
import { SignupService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

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
  selectedValue: string;
  date = new FormControl(moment());
  public body:any={}
  public flag=false;
  public isDeleted=false;
  public dateflag=false;
 
  reminders: any = [
    {value: 'Morning', viewPeriod:'Morning', viewTime: '08:00 AM', disableStatus:false},
    {value: 'Afternoon', viewPeriod:'Afternoon' ,viewTime:'01:00 PM',disableStatus:false},
    {value: 'Evening', viewPeriod:'Evening',viewTime:'06:00 PM',disableStatus:false},
    {value: 'Night', viewPeriod:'Night',    viewTime:'08:00 PM',disableStatus:false},
];

  today = new Date();

  // public  today = new Date();
  // public  tomorrow=new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1, 8, 0, 0)

  reminderBody={
    "date": new FormControl(new Date()),
    "time":""
  }
  public value;
  public currentDate;
  public obj;
  public setDate=this.reminderBody.date.value;
  // public today=new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 0, 8, 0, 0)
  constructor(private httpService: SignupService) { }
  @Input() noteid
  @Output() eventEmit = new EventEmitter();
  @Output() eventEmitReminder = new EventEmitter();


  ngOnInit() {
    if(this.noteid!=undefined && this.noteid.isDeleted==true){
      this.isDeleted=true
    }
    this.disabledates()

  }
  
  
  remindToday(){
    // console.log(this.body.reminder);
    
    let currentDate = new Date()
    var today=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
    this.eventEmitReminder.emit(today);
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
        // console.log("event emitting");

      },
        error => {
          // console.log("error in today reminders",error)
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
        // console.log("success in tomorrow reminders",data);
        this.eventEmit.emit({});
       },
        error => {
          // console.log("error in tomorrow reminders",error)
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
        // console.log("success in week reminders",data);
        this.eventEmit.emit({});
      },
        error => {
          // console.log("error in week reminders",error)
     })
  }
}
addCustomRemainders(date,timing){
  timing.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
  if(timing==this.reminderBody.time){
  var timeSplitted=this.reminderBody.time.split("",8);
  var hour= Number(timeSplitted[0]+timeSplitted[1]);
  var minute= Number(timeSplitted[3]+timeSplitted[4]);
  var ampm = (timeSplitted[6]+timeSplitted[7]);
  var emittingDate=new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate(), hour, minute, 0, 0);
  this.eventEmitReminder.emit(emittingDate)
  
  if(ampm == 'AM' || ampm == 'am' && this.noteid!=null){
    this.body = {
      "noteIdList": [this.noteid.id],
      "reminder": new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate(), hour, minute, 0, 0)
    }
    this.httpService.delPost('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('id')).subscribe((result) => {
     this.eventEmitReminder.emit(date)
    //  console.log("emitting event from reminders",this.eventEmitReminder.emit(date));
     
    })
  }else if(ampm =='PM' || ampm =='pm'&& this.noteid!=null){
    this.body = {
      "noteIdList": [this.noteid.id],
      "reminder": new Date(new Date(date).getFullYear(),new Date(date).getMonth(), new Date(date).getDate(), hour+12, minute, 0, 0)
    }
    
  }
  
}
this.httpService.delPost('/notes/addUpdateReminderNotes',this.body,localStorage.getItem('id')).subscribe((result) => {
    this.eventEmitReminder.emit(date)
})
}
disable(event)
  {
    this.dateflag=false;
    var pattern=/^(2[0-3]|1[0-9]|[0][0-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
   if(pattern.test( this.reminderBody.time))
   {
    this.dateflag=true;
   }
   else
   this.dateflag=false;
  }
disabledates(){
  if ((new Date(this.setDate).getFullYear()-new Date(this.today).getFullYear()) === 0) {
    if ((new Date(this.setDate).getMonth() - new Date(this.today).getMonth()) === 0) {
      if ((new Date(this.setDate).getDate() - new Date(this.today).getDate()) === 0) {
        if ((new Date(this.setDate).getHours()) > 8) {
          this.reminders[0].disableStatus = true;
        } if ((new Date(this.setDate).getHours()) > 13) {
          this.reminders[1].disableStatus = true;
        } if ((new Date(this.setDate).getHours()) > 18) {
          this.reminders[2].disableStatus = true;
        } if ((new Date(this.setDate).getHours()) > 20) {
          this.reminders[3].disableStatus = true;
          // LoggerService.log(this.setData)
        }
      }
      
    }
  }

}

}












