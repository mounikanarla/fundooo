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
    return this.httpService.httpPost(url,{});/**passing the input & calling the  getFormUrlEncoded()*/
  }
  delLabel(body) {
    let url = this.URL+ "/noteLabels";
    console.log(url)
    return this.httpService.httpPost(url,body);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getLabelNote(){
    let url = this.URL+"/noteLabels/getNoteLabelList";
    return this.httpService.httpGet1(url);
  }
  deleteLabel(labelId,token){
    let url = this.URL+"/noteLabels/" + labelId + "/deleteNoteLabel";
    return this.httpService.httpDelete(url,token);
  }
  updateLabelPost(labelId,body){
    let url = this.URL+ "/noteLabels/" + labelId.id + "/updateNoteLabel";
    return this.httpService.httpPost(url,body);
  }
  removeLabelPost(index, label){
    let url = this.URL+ "/notes/" + index.id + "/addLabelToNotes/" + label.id + "/remove"
    return this.httpService.httpPost(url,{});
  }
  updateCheckbox(id,modifiedCheckList,body){
    var url = this.URL+ "/notes/" + id + "/checklist/" + modifiedCheckList.id + "/update";
    return this.httpService.httpPost(url,body);
  }
  removeRemainPost(body){
    let url=this.URL+"/notes/removeReminderNotes"
    return this.httpService.httpPost(url,body);

  }
  archivePost(body){
    let url=this.URL+"/notes/archiveNotes"
    return this.httpService.httpPost(url,body);
  }
  colorPost(body){
    let url=this.URL+"/notes/changesColorNotes"
    
    return this.httpService.httpPost(url,body);
  }
  loadingImage(body){
    let url=this.URL+"/user/uploadProfileImage"
    return this.httpService.httpPost2(url,body);
  }
  getLabel(label,body){
    let url=this.URL+"/notes/getNotesListByLabel/" + label;
    return this.httpService.httpPost1(url,body);

  }
  getArchive(){
    let url = this.URL+"/notes/getArchiveNotesList";
    return this.httpService.httpGet1(url);
  }
  trashPost(body){
    let url=this.URL+"/notes/trashNotes"
    return this.httpService.httpPost(url,body);
  }
  addCheckLabel(noteid,label){
    let url=this.URL+"/notes/" + noteid.id + "/addLabelToNotes/" + label.id + "/add"
    return this.httpService.httpPost(url,{});
  }
  deleteForeverPost(body){
    let url=this.URL+'/notes/deleteForeverNotes'
    return this.httpService.httpPost(url,body);

  }
  noteAddingPost(body){
    let url=this.URL+"/notes/addnotes"
    return this.httpService.httpPost2(url,body);
  }
  getNote(){
    let url = this.URL+"/notes/getNotesList";
    return this.httpService.httpGet1(url);
  }
  pinPost(body){
    let url=this.URL+"/notes/pinUnpinNotes"
    return this.httpService.httpPost(url,body);
  }
  reminderPost(body){
    let url=this.URL+'/notes/addUpdateReminderNotes'
    return this.httpService.httpPost(url,body);
  }
  getReminder(){
      let url = this.URL+"/notes/getReminderNotesList";
      return this.httpService.httpGet1(url);
  }
  getTrash(token){
    let url = this.URL+"/notes/getTrashNotesList";
    return this.httpService.httpGet1(url);
  }
  noteUpdate(body){
    let url=this.URL+"/notes/updateNotes"
    return this.httpService.httpPost2(url,body);
  }
  removeCheckList(data,removedList){
      let url = this.URL+ "/notes/" + data.id + "/checklist/" + removedList.id + "/remove"
      return this.httpService.httpPost(url,{});
  }
  addCheckList(data,body){
    let url = this.URL+ "notes/" + data.id + "/checklist/add"
    return this.httpService.httpPost(url,body);
}
}
