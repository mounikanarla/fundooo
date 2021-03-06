import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  hide = true;
  public card = [];
  
  model: any = {
    "firstName": "",
    "lastName": "",
    "phoneNumber": "7536982410",
    "service": "",
    "createdDate": "2018-10-09T06:35:12.617Z",
    "modifiedDate": "2018-10-09T06:35:12.617Z",
    "username": "",
    "email": "",
    "emailVerified": true,
    "password": ""

  }
  public service:any
  show = true;
  constructor(private userService:UserService,public snackBar: MatSnackBar) { }

  ngOnInit() {

    let obs = this.userService.getService();
    obs
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      let data = response["data"];
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.card.push(data.data[i]);
      }
    })
    this.userService.dataStore()
    .pipe(takeUntil(this.destroy$))

      .subscribe((response) => {
        // LoggerService.log(response);
      }

      )
  }


  display(data) {
    this.service = data.name;
    data.select = !data.select;
    for (let i = 0; i < this.card.length; i++) {
      if (data.name == this.card[i].name)
        continue;
      this.card[i].select = false;
    }
  }
  signup() {
    if(this.service.length==0)
    {
      this.snackBar.open("Click on service card", "false", {
        duration: 2000,

    });
      return;
    }
     if(this.model.password!=this.model.confirmpassword)
    {
      this.snackBar.open("password is not matched", "correct the password", {
        duration: 2000,
      
      });
      return;
    }
    this.userService.signupPost( {
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
    })
    .pipe(takeUntil(this.destroy$))

    .subscribe((response) => {

      LoggerService.log("successful");
      this.snackBar.open("Signup successful", "Ok", {
        duration: 2000,
      });

      console.log(response);
    },
      (error) => {
        this.snackBar.open("Enter the details", "Error", {
          duration: 2000,

        });
      })
   }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

