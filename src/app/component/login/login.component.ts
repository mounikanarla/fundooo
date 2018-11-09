import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = "true";
  model: any = {
    email: '',
    password: ''
  }

  constructor(private loginservice: SignupService, public snackBar: MatSnackBar, public router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  token = localStorage.getItem('id');

  ngOnInit() {
    if (this.token != null) {
      this.router.navigateByUrl('/home/notes');
    }
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';

  }

  login() {

    let obs = this.loginservice.httpPost("user/login", {
      "email": this.model.email,
      "password": this.model.password,

    });
    obs.subscribe((response) => {
      // console.log("login successfull")
      localStorage.setItem('id', response["id"]);
      localStorage.setItem('firstName', response["firstName"]);
      localStorage.setItem('lastName', response["lastName"]);
      localStorage.setItem('email', response["email"]);
      localStorage.setItem('userId', response["userId"])
      localStorage.setItem('imageUrl',response["imageUrl"])
      this.router.navigate(['home']);
      this.snackBar.open("login succesfull", "ok", {
        duration: 2000,
      });
      // console.log(response);
    },
      (error) => {
        // console.log(error)
        // console.log("login unsuccessfull")
        this.snackBar.open("Invalid details", "false", {
          duration: 2000,
        });
      }
    )
  }
}