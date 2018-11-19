import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralHttpService {
  URL=environment.apiUrl
  constructor(private http: HttpClient) { }
   httpPost(url,body,access_token){
    var httpAuthOptions1 = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': access_token
        })
      };
      return this.http.post(url, body, httpAuthOptions1);
  }

  httpPost1(url,body){
    return this.http.post(url,body);
  }
  httpGet(url) {
    return this.http.get(url);
   
  }
  httpGet1(url,token) {
    var httpAuthOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
   
    return this.http.get(url,httpAuthOptions2);
   
  }
  httpDelete(url,body){
    return this.http.delete(url,body);
  }
}