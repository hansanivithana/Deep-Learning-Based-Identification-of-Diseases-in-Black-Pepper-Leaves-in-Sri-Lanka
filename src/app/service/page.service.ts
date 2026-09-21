import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl = 'http://localhost:5000/api/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  createAccount(formData:any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl+'create_account',formData);
  }

  login(loginForm:any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl+'login',loginForm);
  }

  changePassword(formData:any){
    return this.httpClient.post<any>(this.baseUrl+'changePassword',formData);
  }

  checkUser(formData:any){
    return this.httpClient.post<any>(this.baseUrl+'checkUser',formData);
  }
}
