import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  URL = "http://34.213.106.173/api";
  constructor(private http: HttpClient) { }
  getdata(value) {
    return this.http.get(this.URL + '/' + value);
  }
  deleteLabel(path,body)
  {
    return this.http.delete(this.URL + '/' + path,body);
  }
  httpPost(value, body) {
    return this.http.post(this.URL + '/' + value, body);
  }
  dataStore(user) {
    return this.http.get(this.URL + '/' + user);
  }

  dataPost(value, data, access_token) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(this.URL + '/' + value, this.getFormUrlEncoded(data), options)
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
  logoutPost(value, token) {
    var body: any = {}
    const logoutOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(this.URL + '/' + value, body, logoutOptions)
  }
  getnote(value, token) {
    // return this.http.get(this.URL + '/' +value,token);
    const dataOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(this.URL + '/' + value, dataOptions);
  }
  delPost(value, data, access_token) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(this.URL + '/' + value, data, options)
  }
  colorPost(value, data, access_token) {
    const colorOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(this.URL + '/' + value, data, colorOption)
  }
}



