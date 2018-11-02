import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
constructor() { }
@Input() noteid
public isDeleted=false;
  ngOnInit() {
    if(this.noteid!=undefined && this.noteid.isDeleted==true){
      this.isDeleted==true
    }
  }

}
