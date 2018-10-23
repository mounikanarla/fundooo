import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private getService: SignupService,public route:ActivatedRoute,public router:Router ) { }
  private press: boolean = true;
  private express: boolean = true;

 public title;
 public description;
 public isPinned=false;
 private  id=localStorage.getItem('id');
  public body:any={}

  ngOnInit() {
  }
  toggleChild(){
      this.press = !this.press; 
  }
  close(){
    this.express=true;
    this.express=false;

}
  notes(){
    this.title=document.getElementById("title").textContent;
    this.description=document.getElementById("description").textContent;
console.log(this.title);
console.log(this.description);
    console.log(this.id);
    this.getService.dataPost("notes/addnotes", this.body ={
        "title":this.title,
        "description":this.description,
        "labelIdList":"",
        "checklist":"",
        "isPinned":false
    },this.id).subscribe((response) =>{
      console.log("successful",response);
      console.log(this.id);
      this.getService.getnote("notes/getNotesList",this.id).subscribe((response)=>{
        console.log(response);
      })

    },
    (error)=>{
      console.log(error);

    }
  )

}
}