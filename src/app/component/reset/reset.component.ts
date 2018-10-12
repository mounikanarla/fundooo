import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
 model:any={
   "password":""
 }
  constructor(private resetService: SignupService, public snackBar: MatSnackBar,public route:ActivatedRoute) { }

  ngOnInit() {
  }
  public id = this.route.snapshot.params.id
  reset(){
    console.log("inn");
    // if(this.model.password != this.model.confpassword)
    // {
    //   this.snackBar.open("failed","passwords are not matching", {
    //     duration: 2000,
    //   });
    //   return;
    // }
    var body={ 
      "newPassword": this.model.password
    }
    console.log(this.model.password)
    console.log(this.id)
    this.resetService.dataPost("user/reset-password", body,this.id)
    .subscribe((response) =>{
       console.log("password successfully changed");
       this.snackBar.open("success","Success", {
        duration: 2000,
      });
     },(error) => {
       console.log("unsuccess");
       console.log(error);
      
       this.snackBar.open("failed","failed", {
         duration: 2000,
       });
     });
  }


}
