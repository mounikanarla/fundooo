import { Injectable } from '@angular/core';
import { GeneralHttpService } from '../generalHttpService/general-http.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL=environment.apiUrl;
  constructor(private httpService: GeneralHttpService ) { }
  loginPost(body) {
    let url = this.URL+ "/user/login";
    return this. httpService.httpPost1(url,body);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  signupPost(body) {
    let url = this.URL+ "/user/userSignUp";
    return this. httpService.httpPost1(url,body);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getService(){
    let url = this.URL+ "/user/service";
    console.log(url);
    return this. httpService.httpGet(url);
  }
  resetPost(body) {
    let url = this.URL+ "/user/reset";
    return this. httpService.httpPost1(url,body);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  passwordPost(body){
    let url = this.URL+ "/user/reset-password";
    return this. httpService.httpPost(url,body);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  dataStore() {
    let url = this.URL+ "/user";
    return this.httpService.httpGet(url);
  }
  pushToken(body){
    let url = this.URL+"user/registerPushToken";
    return this. httpService.httpPost(url,body);
  }
  searchpeople(body){
    let url=this.URL+'/user/searchUserList';
    return this.httpService.httpPost(url,body);
}
}
