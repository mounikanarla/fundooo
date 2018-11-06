import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {
    "email": ""
  }
  constructor(private forgotPassword: SignupService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  forgotPass() {
    if (this.model.email.length == 0) {
      this.snackBar.open("failed", "Enter Email", {
        duration: 2000,
      });
      return;
    }
    this.forgotPassword.httpPost("user/reset", {
      "email": this.model.email
    }).subscribe((response => {
      this.snackBar.open("password is send to your email", "Ok", {
        duration: 2000,
      })
    }),
      (error => {
        this.snackBar.open("Error occured", "Try again", {
          duration: 2000,
        });
      })
    )
  }
}
