import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor() { }
  @Input() noteid
  public isDeleted = false;
  ngOnInit() {
    if (this.noteid != undefined && this.noteid.isDeleted == true) {
      this.isDeleted = true
    }
  }

}
