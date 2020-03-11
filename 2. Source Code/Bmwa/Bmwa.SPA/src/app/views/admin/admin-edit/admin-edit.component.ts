import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/_models/admin';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  @ViewChild('editForm', null) editForm: NgForm;
  admin: Admin;
  editPass = false;
  repeatPass: string;
  pass: string;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.admin = data['admin'];
    });
    this.pass = this.admin.password;
  }

  updateAdmin() {
    if (this.editPass === true && this.repeatPass !== this.admin.password) {
      this.alertify.error('Your repeat password is not match to your password!');
      return;
    }
    this.adminService.updateAdmin(this.authService.decodedToken.nameid, this.admin)
    .subscribe(next => {
      this.alertify.success('Profile updated successfully!');
      this.editForm.reset(this.admin);
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleEditPass() {
    if (this.editPass === true) {
      this.pass = this.admin.password;
    }
    return this.editPass = !this.editPass;
  }

}
