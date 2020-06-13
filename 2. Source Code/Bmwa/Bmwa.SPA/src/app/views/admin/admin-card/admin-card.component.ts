import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/_models/admin';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent implements OnInit {
  @Input() admin: Admin;
  adminIdForDeletion: number;
  deleteMode = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.adminIdObserver.subscribe(id => this.adminIdForDeletion = id);
  }

  deleteAdmin(id: number) {
    this.deleteMode = !this.deleteMode;
    if (this.deleteMode) {
      this.adminService.changeAdminId(id);
    } else {
      this.adminService.changeAdminId(-1);
    }
  }

}
