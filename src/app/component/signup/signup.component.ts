import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/services/userServices/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
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
  constructor(private userService:UserService, private signservice: SignupService, public snackBar: MatSnackBar) { }

  ngOnInit() {

    let obs = this.userService.getService();
    obs.subscribe((response) => {
      var data = response["data"];
      //  console.log(data);
      // console.log(data.data.length);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.card.push(data.data[i]);
        // console.log(data.data[i]);
      }
      // console.log(this.card);
    })
    this.signservice.dataStore("user")
      .subscribe((response) => {
        // console.log(response);
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
      console.log(this.model.password)
      console.log(this.model.confirmpassword)
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
    }).subscribe((response) => {

      console.log("successful");
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

    console.log(this.model);
    console.log(this.service);


  }
}

