import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Admin } from 'src/app/_models/admin';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  @ViewChild('newPass', null) newPass: ElementRef;
  admin: Admin;
  photoUrl: string;

  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileMode = false;
  passwordMode = false;
  passwordModified: string;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.profileMode || this.passwordMode) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.admin = data['admin'];
    });
    this.createEditForm(this.admin);
    this.authService.currentPhotoUrl.subscribe(
      url => this.photoUrl = url
    );
  }

  createEditForm(admin: Admin) {
    this.profileForm = new FormGroup({
      gender: new FormControl(this.admin.gender),
      email: new FormControl(this.admin.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.admin.phone, Validators.required),
      address: new FormControl(this.admin.address, Validators.required),
    });
    this.passwordForm = new FormGroup(
      {
        oldPassword: new FormControl(null, Validators.required),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        repeatPassword: new FormControl(null, [
          Validators.required,
          this.passwordMatchValidatorControl.bind(this),
        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidatorControl(control: FormControl) {
    return this.newPass !== null && this.passwordModified !== control.value
      ? { mismatch: true }
      : null;
  }
  passwordMatchValidator(group: FormGroup) {
    return group.get('newPassword').value === group.get('repeatPassword').value
      ? null
      : { mismatch: true };
  }

  modifyProfile() {
    this.profileMode = true;
  }

  modifyPassword() {
    this.passwordMode = true;
    this.passwordModified = this.passwordForm.get('newPassword').value;
  }

  updateProfile() {
    this.profileMode = false;
    this.adminService
      .updateAdminProfile(this.admin.id, this.profileForm.value)
      .subscribe(
        (next) => this.alertify.success('Update profile successfully!'),
        (error) => this.alertify.error(error)
      );
  }

  updatePassword() {
    this.adminService
      .updateAdminPassword(this.admin.id, {
        oldPassword: this.passwordForm.get('oldPassword').value,
        newPassword: this.passwordForm.get('newPassword').value,
      })
      .subscribe(
        (next) => {
          this.alertify.success('Update password successfully!'),
          this.passwordMode = false;
          this.passwordForm.reset({
            oldPassword: null,
            newPassword: null,
            repeatPassword: null,
          });
        },
        (error) => this.alertify.error(error)
      );
  }

  resetProfile() {
    this.profileMode = false;
    this.profileForm.reset({
      username: this.admin.username,
      gender: this.admin.gender,
      email: this.admin.email,
      phone: this.admin.phone,
      address: this.admin.address,
    });
  }

  resetPassword() {
    this.passwordMode = false;
    this.passwordForm.reset({
      oldPassword: null,
      newPassword: null,
      repeatPassword: null,
    });
  }
}
