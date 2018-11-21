import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralHttpService {
  URL=environment.apiUrl
  constructor(private http: HttpClient) { }
   httpPost(url,body){
    var httpAuthOptions1 = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(url, body, httpAuthOptions1);
  }
  httpPost2(url,body){
    var httpAuthOptions2 = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      return this.http.post(url, this.getFormUrlEncoded(body), httpAuthOptions2);
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(toConvert[property])
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join('&')
  }
  httpPost1(url,body){
    return this.http.post(url,body);
  }
  httpPost3(url,body){
    var httpAuthOptions2 = {
        headers: new HttpHeaders({
        })
      };
      return this.http.post(url, body, httpAuthOptions2);
  }
  httpGet(url) {
    return this.http.get(url);
   
  }
  httpGet1(url) {
    var httpAuthOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
   return this.http.get(url,httpAuthOptions2);
   }
  httpDelete(url,body){
    return this.http.delete(url,body);
  }
}