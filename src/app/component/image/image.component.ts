import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() noteid;
  public isDeleted=false;
  constructor() { }
  ngOnInit() {
    if(this.noteid!= undefined && this.noteid.isDeleted == true){
      this.isDeleted=true
    }
  }

}
