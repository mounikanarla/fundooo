import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GeneralHttpService } from '../generalHttpService/general-http.service';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  URL=environment.apiUrl;
  constructor(private httpService: GeneralHttpService ) { }
  
  logoutPost(token) {
    let url = this.URL+ "/user/logout";
    console.log(url)
    return this.httpService.httpPost(url,{},token);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  delLabel(body,token) {
    let url = this.URL+ "/noteLabels";
    console.log(url)
    return this.httpService.httpPost(url,body,token);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getLabelNote(token){
    let url = this.URL+"/noteLabels/getNoteLabelList";
    return this.httpService.httpGet1(url,token);
  }
  deleteLabel(labelId,token){
    let url = this.URL+"/noteLabels/" + labelId + "/deleteNoteLabel";
    return this.httpService.httpDelete(url,token);
  }
  updateLabelPost(labelId,body,token){
    let url = this.URL+ "/noteLabels/" + labelId.id + "/updateNoteLabel";
    return this.httpService.httpPost(url,body,token);
  }
  removeLabelPost(index, label,token){
    let url = this.URL+ "notes/" + index.id + "/addLabelToNotes/" + label.id + "/remove"
    return this.httpService.httpPost1(url,token);
  }
  updateCheckbox(id,modifiedCheckList,body,token){
    var url = this.URL+ "notes/" + id + "/checklist/" + modifiedCheckList.id + "/update";
    return this.httpService.httpPost(url,body,token);
  }
  removeRemainPost(body,token){
    let url=this.URL+"/notes/removeReminderNotes"
    return this.httpService.httpPost(url,body,token);

  }

}
