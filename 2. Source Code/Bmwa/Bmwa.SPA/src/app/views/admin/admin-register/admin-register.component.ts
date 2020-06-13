import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      gender: new FormControl('male')
    });
  }

  register() {
    // console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value)
      .subscribe(
        (next) => this.alertify.success('Successfully registration new admin!'),
        (error) => this.alertify.error(error)
      );
  }
}
