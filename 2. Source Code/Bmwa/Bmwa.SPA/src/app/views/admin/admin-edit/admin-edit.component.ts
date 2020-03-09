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
  }

  updateAdmin() {
    this.adminService.updateAdmin(this.authService.decodedToken.nameid, this.admin)
    .subscribe(next => {
      this.alertify.success('Profile updated successfully!');
      this.editForm.reset(this.admin);
    }, error => {
      this.alertify.error(error);
    });
  }

}
