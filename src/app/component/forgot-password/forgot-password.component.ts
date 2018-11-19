import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/services/userServices/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {
    "email": ""
  }
  constructor(private forgotPassword: SignupService,public userService:UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  forgotPass() {
    if (this.model.email.length == 0) {
      this.snackBar.open("failed", "Enter Email", {
        duration: 2000,
      });
      return;
    }
    this.userService.resetPost({
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
