import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { Admin } from '../_models/admin';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pageSizeList = [
    { value: '5', display: '5 items' },
    { value: '10', display: '10 items' },
    { value: '20', display: '20 items' },
    { value: '50', display: '50 items' },
  ];
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentAdmin: Admin;

  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  topicName = new BehaviorSubject<string>('Home');
  currentTopicName = this.topicName.asObservable();

  constructor(private http: HttpClient) { }

  changeAdminPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  changeTopicName(topicName: string) {
    this.topicName.next(topicName);
  }

  login(loginForm: FormGroup) {
    return this.http.post(this.baseUrl + 'login', loginForm.value)
      .pipe(
        map((response: any) => {
          const admin = response;
          if (admin) {
            localStorage.setItem('token', admin.token);
            localStorage.setItem('admin', JSON.stringify(admin.admin));
            localStorage.setItem('topicName', 'Home');
            this.decodedToken = this.jwtHelper.decodeToken(admin.token);
            this.currentAdmin = admin.admin;
            this.changeAdminPhoto(this.currentAdmin.photoUrl);
          }
        })
      );
  }

  loggedIn = () => !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));

  register(admin: Admin) {
    return this.http.post(this.baseUrl + 'register', admin);
  }
}
