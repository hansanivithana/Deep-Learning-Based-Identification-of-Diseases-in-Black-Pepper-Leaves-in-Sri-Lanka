import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  private baseUrl = 'http://localhost:5000/api/';

  constructor(
    private httpClient : HttpClient
  ) { }


  getData(data:any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'predict', data);
  }
}
