import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private httpService: SignupService) { }
public array=[]
token=localStorage.getItem('id');

  ngOnInit() {
    this.getCard();
  }
  // addNewEntry(event){
   
  // }
    getCard(){
      this.httpService.getnote("notes/getNotesList",this.token).subscribe(data=>{
       
        console.log("get cards list successfull",data);
        var length=data['data'].data.length;
        for(var i=length-1;i>=0;i--)
        {
          console.log(data['data'].data.length);
  
        this.array[i]=(data['data'].data[length-1-i]);
        }
        console.log("array",this.array);
    })
  }
}
