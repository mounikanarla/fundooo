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
  addNewEntry(event){
    if(event){
      // this.array=[];
      this.getCard();
    }
  }
    getCard(){
      this.httpService.getnote("notes/getNotesList",this.token).subscribe(data=>{
        this.array=[];

        console.log("get cards list successfull",data);
        var length=data['data'].data.length;

        for(var i=length-1;i>=0;i--)
        {
          console.log(data['data'].data.length);
          if(data['data'].data[i].isDeleted==false){
        this.array.push(data['data'].data[i]);
      }
        }
        console.log("array",this.array);
    })
  }
    delete(event){
      if(event){
      this.getCard();
      }
    }
    colour(event){
      if(event){
        this.getCard();
        }
    }
    archive(event){
      console.log(event)
      if(event){
        this.getCard();
      }
    }
}
