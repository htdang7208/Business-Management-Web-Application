import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface User {
  id: number;
  username: string;
  passwordHash: string;
  passwordSalt: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log('Logged in successfully!');
      }, error => {
        console.log(error.error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
