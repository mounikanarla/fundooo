import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/userServices/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  model: any = {
    "password": ""
  }
  constructor(private userService: UserService, public snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
  }
  public id = this.route.snapshot.params.id
  reset() {
    console.log("inn");
    if (this.model.password.length == 0) {
      this.snackBar.open("failed", "Enter Password", {
        duration: 2000,
      });
      return;
    }
    var body = {
      "newPassword": this.model.password
    }
    console.log(this.model.password)
    console.log(this.id)
    this.userService.passwordPost(body, this.id)
      .subscribe((response) => {
        console.log("password successfully changed");
        this.snackBar.open("success", "Success", {
          duration: 2000,
        });
      }, (error) => {
        console.log("unsuccess");
        console.log(error);

        this.snackBar.open("failed", "failed", {
          duration: 2000,
        });
      });
  }


}
