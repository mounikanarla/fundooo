import { Component, OnInit } from '@angular/core';
import{SignupService} from '../../services/http.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide=true;
  public card=[];
  // show=true;
  constructor(private signservice:SignupService) { }

  ngOnInit() {
    let obs=this.signservice.getdata("user/service");
    obs.subscribe((response)=>{
      var data=response["data"];
    //  console.log(data);
      // console.log(data.data.length);
       for(var i=0;i<data.data.length;i++){
         data.data[i].select=false;
       this.card.push(data.data[i]);
       console.log(data.data[i]);
      }
       console.log(this.card);
      
  })
}
  
display(data){
  data.select=!data.select;
  // console.log(data.name);
  // console.log(this.card[i].name)
  
  for(var i=0;i<this.card.length;i++)
  {
    if(data.name==this.card[i].name)
    
      continue;
    this.card[i].select=false;
    
  }


}
}