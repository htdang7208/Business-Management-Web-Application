import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.model)
    .subscribe(next => {
      this.alertify.success('registration successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

}
