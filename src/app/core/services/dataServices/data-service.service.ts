import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSource1 = new Subject<boolean>();
  currentMessage1 = this.messageSource1.asObservable();

  private messageSource2 = new BehaviorSubject('FUNDOO');
  currentMessage2 = this.messageSource2.asObservable();
 
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message: boolean) {
    this.messageSource1.next(message)
  }

  changelabel(message: string) {
    this.messageSource2.next(message)
    console.log(message);
    
  }

}
