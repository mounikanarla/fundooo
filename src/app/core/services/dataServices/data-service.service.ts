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


  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message: boolean) {
    this.messageSource1.next(message)
  }

}