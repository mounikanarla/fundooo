import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/http.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide = true;
  public card = [];
  registerForm: FormGroup;
    submitted = false;

  // show=true;
  constructor(private signservice: SignupService) { }

  ngOnInit() {
    
    let obs = this.signservice.getdata("user/service");
    obs.subscribe((response) => {
      var data = response["data"];
      //  console.log(data);
      // console.log(data.data.length);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.card.push(data.data[i]);
        console.log(data.data[i]);
      }
      console.log(this.card);
    })
     this.signservice.dataStore("user")
    .subscribe((response) => {
      console.log(response);
    }

  )
}
  display(data) {

    this.service = data.name;
    data.select = !data.select;
    // console.log(data.name);
    // console.log(this.card[i].name)

    for (var i = 0; i < this.card.length; i++) {
      if (data.name == this.card[i].name)
        continue;
      this.card[i].select = false;

    }
  }

  public service;
  model: any = {};
  signup() {
    this.signservice.httpPost("/user/userSignUp", {
      "firstName": this.model.firstName,
      "lastName": this.model.lastName,
      "phoneNumber": "7536982410",
      "service": this.service,
      "createdDate": "2018-10-09T06:35:12.617Z",
      "modifiedDate": "2018-10-09T06:35:12.617Z",
      "username": this.model.email,
      "email": this.model.email,
      "emailVerified": true,
      "password": this.model.password
    }).subscribe((response) => {
      console.log("successful")
      console.log(response);
      },
      (error) => {
        console.log("error happened");
        console.log(error);
      }
    )
     console.log(this.model);
     console.log(this.service);
    
}
}
