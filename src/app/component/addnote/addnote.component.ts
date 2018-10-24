import { Component,Input, OnInit } from '@angular/core';
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

  ngOnInit() {
  // this.getCard();
  // this.refreshData();     
console.log(this.newData)
  }
}
//   getCard(){
//     this.httpService.getnote("notes/getNotesList",this.token).subscribe(data=>{
     
//       console.log("get cards list successfull",data);
//       var length=data['data'].data.length;
//       for(var i=length-1;i>=0;i--)
//       {
//         console.log(data['data'].data.length);

//       this.array[i]=(data['data'].data[length-1-i]);
//       }
//       console.log("array",this.array);
//   })
// }
// refreshData(){
//   this.dataRefresher =
//     setInterval(() => {
//       this.getCard();
//       //Passing the false flag would prevent page reset to 1 and hinder user interaction
//   }, 300); 
// }
// }
