import { Component, OnInit } from '@angular/core';
import { University } from 'src/app/_models/university';
import { Pagination } from 'src/app/_models/pagination';
import { PageSizes } from 'src/app/_models/page-size';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UniversityService } from 'src/app/_services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  universities: University[];
  pagination: Pagination;
  nameFilter: string;
  addMode = false;
  editMode = false;
  currentUniversityId = -1;
  currentPage = 1;
  university: University;
  pageSizes: PageSizes = new PageSizes();

  constructor(private route: ActivatedRoute,
              private universityService: UniversityService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.universities = data['universities'].result;
        this.pagination = data['universities'].pagination;
      }
    );
  }
  loadUniversities() {
    this.universityService.getUniversities(this.pagination.currentPage, this.pagination.itemsPerPage, this.nameFilter)
      .subscribe(
        data => {
          this.universities = data.result;
          this.pagination = data.pagination;
        }
      );
  }
  resetFilter() {
    this.nameFilter = null;
    this.loadUniversities();
  }
  openAdd() {
    this.editMode = false;
    this.currentUniversityId = -1;
    this.addMode = !this.addMode;
  }

  openEdit(university: University) {
    this.addMode = false;
    if (this.currentUniversityId !== university.id) {
      this.editMode = true;
      this.currentUniversityId = university.id;
      this.university = university;
    } else {
      this.editMode = false;
      this.currentUniversityId = -1;
    }
  }

  loadAfterChanged(currentPage: number) {
    this.pagination.currentPage = currentPage;
    this.loadUniversities();
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.currentPage = this.pagination.currentPage;
    this.loadUniversities();
  }
  removeUniversity(university: University) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + university.name,
      () => {
        this.universityService.delete(university.id).subscribe(
          (next) => {
            this.alertify.success('Delete university successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadUniversities();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
