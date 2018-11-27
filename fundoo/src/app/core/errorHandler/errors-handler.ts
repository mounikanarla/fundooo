import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { GeneralHttpService } from '../services/generalHttpService/general-http.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(private snackBar:MatSnackBar,private injector: Injector){}

  handleError(error: Error | HttpErrorResponse) {
     // Do whatever you like with the error (send it to the server?)
     // And log it to the console
     const notificationService = this.injector.get(GeneralHttpService);
     console.error('It happens: ', error);
     this.snackBar.open("Error","err", {
      duration: 2000,
    });
    if (error instanceof HttpErrorResponse) {

    // Server or connection error happened
    if (!navigator.onLine) {
      return notificationService.notify('No Internet Connection');
      // Handle offline error
    } else {
      return notificationService.notify(`${error.status} - ${error.message}`);
      // Handle Http Error (error.status === 403, 404...)
    }
 } else {
   // Handle Client Error (Angular Error, ReferenceError...)     
 }
}
}