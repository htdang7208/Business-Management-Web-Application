import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  sendEmail() {

  }
}
