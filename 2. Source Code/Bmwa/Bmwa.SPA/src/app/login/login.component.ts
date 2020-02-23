import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(username: HTMLInputElement, password: HTMLInputElement) {
    this.loginService.login(username.value, password.value)
    .subscribe(
      result => {
        alert(result.message);
      }
    );
  }
  
}
