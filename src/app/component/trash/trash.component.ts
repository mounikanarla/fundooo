import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/noteServices/note.service';
import {NoteModel} from '../../core/models/note-model'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService:NoteService) { }
  list:NoteModel[]=[]

  public array = []
  token = localStorage.getItem('id');

  ngOnInit() {
      this.trash();
  }
trash(){
  this.noteService.getTrash(this.token)
  .pipe(takeUntil(this.destroy$))

  .subscribe(data => {
    this.array = [];

    console.log("get cards list successfull", data);
 this.list=data['data'].data
    for (let i = this.list.length- 1; i >= 0; i--) {
      // LoggerService.log(this.list.length);
      {
        this.array.push(this.list[i]);
      }
    }
    LoggerService.log("Trash array", this.array);
  })
}
emit(event){
  if(event){
    this.trash();
  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
