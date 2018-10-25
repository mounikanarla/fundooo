import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  public array=[];
  token=localStorage.getItem('id');
  // dataRefresher: any;
@Input()  newData;
@Output() eventEmit = new EventEmitter();
@Output() onEmit = new EventEmitter();
@Output() archiveEmit = new EventEmitter();

  ngOnInit() {
  
console.log(this.newData)
  }
  delete(event){
    console.log(event)
    if(event){
      this.eventEmit.emit({});
    }
  }
  colour(event){
    console.log(event)
    if(event){
      this.onEmit.emit({});
    }
  }
  archive(event){
    console.log(event)
    if(event){
      this.archiveEmit.emit({});
    }
  }
}
