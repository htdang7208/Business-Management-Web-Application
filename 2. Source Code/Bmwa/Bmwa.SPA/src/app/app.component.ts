import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Admin } from './_models/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const admin: Admin = JSON.parse(localStorage.getItem('admin'));
    const topicName: string = localStorage.getItem('topicName');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (admin) {
      this.authService.currentAdmin = admin;
      // when F5, data is still not miss
      this.authService.changeAdminPhoto(admin.photoUrl);
      this.authService.changeTopicName(topicName);
    }
  }
}
