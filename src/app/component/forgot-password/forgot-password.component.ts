import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
model:any={
  "email":""
}
  constructor(private forgotPassword:SignupService,public snackBar:MatSnackBar) { }

  ngOnInit() {
  }
  forgotPass()
  {
    console.log("fgjggh");
    this.forgotPassword.httpPost("user/reset",{
      "email":this.model.email
    }).subscribe((response=>{
      console.log(response);
      this.snackBar.open("password is send to your email", "Ok", {
        duration: 2000,
      })
    }),
    (error=>{
      console.log(error);
      this.snackBar.open("Error occured", "Try again", {
        duration: 2000,
      });
    })
  )
  }

}
