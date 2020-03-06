import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully!');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  forgotPassword() {}
  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   return !!token;
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   console.log('Logged out');
  // }

 }
