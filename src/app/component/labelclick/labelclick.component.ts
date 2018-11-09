import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-labelclick',
  templateUrl: './labelclick.component.html',
  styleUrls: ['./labelclick.component.css']
})
export class LabelclickComponent implements OnInit {
  // @Output() eventEmitLabel = new EventEmitter();  

  constructor(private httpService: SignupService, private route: ActivatedRoute) { }
  public array = [];
  public label;
  token = localStorage.getItem('id');
  public id;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.label = params['params'];
        this.getCard(this.label)
        console.log("ppp", params);
      })
  }
  getCard(label) {
    this.httpService.logoutPost("notes/getNotesListByLabel/" + label, this.token).subscribe(data => {
      this.array = [];
      for (var i = data['data'].data.length - 1; i >= 0; i--) {
        this.array.push(data['data'].data[i]);

      }
      console.log("array", this.array);
    })
  }
  emit(event) {
    this.getCard(this.label)
  }
}
