import { Component, Input,Output,OnInit,EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-changecolor',
  templateUrl: './changecolor.component.html',
  styleUrls: ['./changecolor.component.css']
})
export class ChangecolorComponent implements OnInit {

  constructor(private httpService: SignupService) { }
  token=localStorage.getItem('id');

  @Input()  colorid;
  public body:any={}
  @Output() eventEmit = new EventEmitter();  
  ngOnInit() {
  }
  changeColor(color){
    console.log(this.colorid)
    var array=[]
    array.push(this.colorid)
    this.httpService.colorPost("notes/changesColorNotes", this.body ={
      "color":color,
      "noteIdList":array
    },this.token).subscribe((response) =>{
    // console.log(  this.onEmit.emit() )
    console.log("successful",response);
    this.eventEmit.emit({});
  },
    (error)=>{
    console.log("error",error);
    })
  }
}
