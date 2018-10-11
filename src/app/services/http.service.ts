import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  URL = "http://34.213.106.173/api";
  constructor(private http: HttpClient) { }
  getdata(value) {
    return this.http.get(this.URL + '/' + value);
  }
  httpPost(value, body) {
    return this.http.post(this.URL + '/' + value, body);
  }
  dataStore(user) {
    return this.http.get(this.URL + '/' + user);
  }
}
