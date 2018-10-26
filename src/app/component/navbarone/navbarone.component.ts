import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignupService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbarone',
  templateUrl: './navbarone.component.html',
  styleUrls: ['./navbarone.component.css']
})
export class NavbaroneComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  profileclick: boolean = false;
  private id = localStorage.getItem('id');
  public firstName = localStorage.getItem('firstName');
  public lastName = localStorage.getItem('lastName');
  public email = localStorage.getItem('email');
  constructor(private breakpointObserver: BreakpointObserver, private logoutService: SignupService, public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router) { }
  profile() {
    this.profileclick = !this.profileclick;
  }
  logout() {
    console.log(this.id)
    this.logoutService.logoutPost("user/logout", this.id)
      .subscribe((response) => {
        console.log(response);
        localStorage.removeItem('id');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        this.router.navigate(['login']);
        this.snackBar.open("Logout", "Success", {
          duration: 2000,
        });
      }, (error) => {
        console.log("unsuccess");
        console.log(error);
          this.snackBar.open("Logout", "failed", {
          duration: 2000,
        });
      }
    )
  }
}
