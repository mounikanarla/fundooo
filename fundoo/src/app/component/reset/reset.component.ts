import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
    let body = {
      "newPassword": this.model.password
    }
   
    this.userService.passwordPost(body)
    .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        LoggerService.log("password successfully changed");
        this.snackBar.open("success", "Success", {
          duration: 2000,
        });
      }, (error) => {
        LoggerService.log("unsuccess");
        LoggerService.log(error);

        this.snackBar.open("failed", "failed", {
          duration: 2000,
        });
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
