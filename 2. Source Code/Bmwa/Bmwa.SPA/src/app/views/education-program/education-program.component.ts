import { Component, OnInit } from '@angular/core';
import { EducationProgram } from 'src/app/_models/education-program';
import { Pagination } from 'src/app/_models/pagination';
import { PageSizes } from 'src/app/_models/page-size';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EducationProgramService } from 'src/app/_services/education-program.service';

@Component({
  selector: 'app-education-program',
  templateUrl: './education-program.component.html',
  styleUrls: ['./education-program.component.css'],
})
export class EducationProgramComponent implements OnInit {
  educationPrograms: EducationProgram[];
  pagination: Pagination;
  nameFilter: string;
  addMode = false;
  editMode = false;
  currentEducationProgramId = -1;
  currentPage = 1;
  EducationProgram: EducationProgram;
  pageSizes: PageSizes = new PageSizes();

  constructor(
    private route: ActivatedRoute,
    private educationProgramService: EducationProgramService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.educationPrograms = data['educationPrograms'].result;
      this.pagination = data['educationPrograms'].pagination;
    });
  }
  loadEducationPrograms() {
    this.educationProgramService
      .getEducationPrograms(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.nameFilter
      )
      .subscribe((data) => {
        this.educationPrograms = data.result;
        this.pagination = data.pagination;
      });
  }
  resetFilter() {
    this.nameFilter = null;
    this.loadEducationPrograms();
  }
  openAdd() {
    this.editMode = false;
    this.currentEducationProgramId = -1;
    this.addMode = !this.addMode;
  }

  openEdit(educationProgram: EducationProgram) {
    this.addMode = false;
    if (this.currentEducationProgramId !== educationProgram.id) {
      this.editMode = true;
      this.currentEducationProgramId = educationProgram.id;
      this.EducationProgram = educationProgram;
    } else {
      this.editMode = false;
      this.currentEducationProgramId = -1;
    }
  }

  loadAfterChanged(currentPage: number) {
    this.pagination.currentPage = currentPage;
    this.loadEducationPrograms();
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.currentPage = this.pagination.currentPage;
    this.loadEducationPrograms();
  }
  removeEducationProgram(educationProgram: EducationProgram) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + educationProgram.name,
      () => {
        this.educationProgramService.delete(educationProgram.id).subscribe(
          (next) => {
            this.alertify.success('Delete EducationProgram successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadEducationPrograms();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
