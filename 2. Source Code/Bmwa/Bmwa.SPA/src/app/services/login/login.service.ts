import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BaseResponse {
  errorCode: number;
  message: string;
  data: LoginInfo;
}

export interface LoginInfo {
  id: number;
  firstName: string;
  username: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: ApiService, private http: HttpClient) { }

  login(username: string, password: string): Observable<BaseResponse> {
    const loginRequest = {
      username: username,
      password: password
    };
    
    return this.http.post<BaseResponse>(this.api.apiUrl.login, loginRequest);
  }
}
