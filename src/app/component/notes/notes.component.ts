import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  outputs: ['onNewEntryAdded']

})
export class NotesComponent implements OnInit {

  constructor(private getService: SignupService, public route: ActivatedRoute, public router: Router) { }
  private press: boolean = true;
  // private express: boolean = true;
  @Output() onNewEntryAdded = new EventEmitter();
  //  public newObject: string;


  public title;
  public description;
  public isPinned = false;
  private id = localStorage.getItem('id');
  public body: any = {}

  ngOnInit() {
  }
  toggleChild() {
    this.press = !this.press;
  }
  
  notes() {
    this.title = document.getElementById("title").textContent;
    this.description = document.getElementById("description").textContent;
    this.press = !this.press;
    console.log(this.title);
    console.log(this.description);
    console.log(this.id);
    this.getService.dataPost("notes/addnotes", this.body = {
      "title": this.title,
      "description": this.description,
      "labelIdList": "",
      "checklist": "",
      "isPinned": false
    }, this.id).subscribe((response) => {
      console.log("successful", response);
      console.log(this.id);
      this.getService.getnote("notes/getNotesList", this.id).subscribe((response) => {
        console.log(response);
        this.onNewEntryAdded.emit({});
      })

    },
      (error) => {
        console.log(error);

      }
    )

  }
}