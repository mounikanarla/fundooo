import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignupService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddlabelComponent } from '../../component/addlabel/addlabel.component';
import { DataServiceService } from '../../core/services/dataServices/data-service.service';
import { CropimageComponent } from '../../component/cropimage/cropimage.component';

@Component({
  selector: 'app-navbarone',
  templateUrl: './navbarone.component.html',
  styleUrls: ['./navbarone.component.scss']
})
export class NavbaroneComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  searchInput: any
  public array = [];
  profileclick: boolean = false;
  private id = localStorage.getItem('id');
  public firstName = localStorage.getItem('firstName');
  public lastName = localStorage.getItem('lastName');
  public email = localStorage.getItem('email');
  public number = 1;
  public image = localStorage.getItem('imageUrl');
  public img = "http://34.213.106.173/" + this.image;
  @Output() eventEmit = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private logoutService: SignupService, public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, public dialog: MatDialog, private data: DataServiceService) { }
  ngOnInit() {
    this.checkLabel();
    // this.data.currentMessage.subscribe(message => this.message = message)

  }
  clicksearch() {
    console.log('in')
    this.router.navigate(['/home/search']);
  }
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
  /**addlabel() method to open the add-label dialog box when it is clicked */
  addlabel() {
    /*open dialog  */
    this.dialog.open(AddlabelComponent, {
      data: {

        panelClass: 'myapp-no-padding-dialog'

      }
    });
  }
  checkLabel() {
    this.logoutService.getnote("noteLabels/getNoteLabelList", localStorage.getItem('id')).subscribe(
      response => {
        this.array = [];
        console.log(response['data'].details);
        for (var i = 0; i < (response['data'].details).length; i++) {
          if (response['data'].details[i].isDeleted == false) {
            this.array.push(response['data'].details[i])
          }
        }
        console.log(this.array, "Label array printing successsss ");
      },
      error => {
        console.log("error in get LABELS", error);
      }
    )
  }
  newMessage() {
    this.data.changeMessage(this.searchInput)
  }
  listview() {
    this.number = 0;
    this.data.changeView(true);
  }
  gridview() {
    this.number = 1;
    this.data.changeView(false);
  }

  fileSelected(event): void {
    const dialogRef = this.dialog.open(CropimageComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.eventEmit.emit({});
      this.image = localStorage.getItem('imageUrl');
      this.img = "http://34.213.106.173/" + this.image;
    });
  }

  croppedImage: any = '';
  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }

}