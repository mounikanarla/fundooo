import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide="true";
  model:any={
    email:'',
    password:''
  }
  constructor(private loginservice: SignupService,public snackBar : MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
  }
login(){
let obs=this.loginservice.httpPost("/user/login", {
  "email": this.model.email,
  "password": this.model.password,

});
obs.subscribe((response) => {
   console.log("login successfull")
   this.snackBar.open("login succesfull", "ok", {
    duration: 2000,
  });
  console.log(response);
},
(error) => {
  console.log(error)
  console.log("login unsuccessfull")
  this.snackBar.open("Invalid details", "false", {
   duration: 2000,
 });
}
)
}
}