import { Component, OnInit, TemplateRef } from '@angular/core';
import { Admin } from 'src/app/_models/admin';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent implements OnInit {
  admins: Admin[];
  adminIdForDeletion = -1;
  genderList = [
    { value: 'default', display: 'Choose gender' },
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];
  pageSizeList = [
    { value: '10', display: '10 items' },
    { value: '20', display: '20 items' },
    { value: '50', display: '50 items' },
  ];
  adminParams: any = {};
  pagination: Pagination;

  config = {
    keyboard: true,
    class: 'gray modal-lg',
  };
  registerModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.admins = data['admins'].result;
      this.pagination = data['admins'].pagination;
    });

    this.adminParams.username = '';
    this.adminParams.gender = 'default';
    this.adminParams.orderBy = 'default';

    this.adminService.adminIdObserver.subscribe((adminId) => {
      this.adminIdForDeletion = adminId;
      console.log(this.adminIdForDeletion);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService
      .getAdmins(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.adminParams
      )
      .subscribe(
        (response: PaginationResult<Admin[]>) => {
          this.admins = response.result;
          this.pagination = response.pagination;
        },
        (error) => this.alertify.error(error)
      );
  }

  resetFilter() {
    this.adminParams.username = '';
    this.adminParams.gender = 'default';
    this.adminParams.orderBy = 'default';
    this.loadAdmins();
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.registerModalRef = this.modalService.show(template, this.config);
  }

  deleteAdmin(id: number) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete admin with id: ' + id,
      () => {
        this.adminService.deleteAdmin(id).subscribe(
          (next) => {
            this.alertify.success('Delete successfully');
            this.loadAdmins();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
