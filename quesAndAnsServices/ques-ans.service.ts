import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GeneralHttpService } from '../generalHttpService/general-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuesAnsService {
  constructor(private httpService: GeneralHttpService ) { }
  URL=environment.apiUrl;

  singleNote(noteid){
    let url = this.URL+"/notes/getNotesDetail/"+noteid
    return this.httpService.httpGet(url);
  }
  questionNote(body){
    let url = this.URL+"/questionAndAnswerNotes/addQuestionAndAnswer"
    return this.httpService.httpPost(url,body);
  }
  like(parentId,body){
    let url = this.URL+"/questionAndAnswerNotes/like/"+parentId
    return this.httpService.httpPost(url,body);
  }
  rate(parentId,body){
    let url = this.URL+"/questionAndAnswerNotes/rate/"+parentId
    return this.httpService.httpPost(url,body);
  }
  reply(parentId,body){
    let url = this.URL+"/questionAndAnswerNotes/reply/"+parentId
    return this.httpService.httpPost(url,body);
  }
  
}
