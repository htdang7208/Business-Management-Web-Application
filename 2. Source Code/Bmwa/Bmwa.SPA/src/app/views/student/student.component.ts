import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Input } from '@angular/core';
import { Student } from 'src/app/_models/student';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { StudentService } from 'src/app/_services/student.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  pageSizeList = [
    { value: '5', display: '5 items' },
    { value: '10', display: '10 items' },
    { value: '20', display: '20 items' },
    { value: '50', display: '50 items' },
  ];
  statusList = [
    { value: -1, display: 'None' },
    { value: 0, display: 'Failed' },
    { value: 1, display: 'Passed' },
    { value: 2, display: 'Not attend' }
  ];

  editModalRef: BsModalRef;
  currentPage: number;
  students: Student[];
  student: Student;
  pagination: Pagination;
  filterForm: FormGroup;

  constructor(private studentService: StudentService,
              private alertify: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.createFilterForm();
    this.pagination = new Pagination();
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 5;

    this.studentService.changeInterviewId(-1);
    this.studentService.interviewId.subscribe(interId => {
      this.filterForm.get('interviewId').patchValue(interId);
      this.loadStudents();
    });
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(),
      identityNumber: new FormControl(),
      interviewTime: new FormControl(),
      status: new FormControl(this.statusList[0].value),
      interviewId: new FormControl()
    });
  }

  resetFilter() {
    this.filterForm.reset({
      name: null,
      identityNumber: null,
      interviewTime: null,
      status: -1,
      interviewId: -1
    });
    this.loadStudents();
  }

  onKeyup(event: any) {
    if (event.keyCode === 13) {
      this.loadStudents();
    }
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.pagination.currentPage = event.page;
    this.loadStudents();
  }

  loadStudents() {
    this.studentService
    .getStudents(this.pagination.currentPage, this.pagination.itemsPerPage, this.filterForm.value)
    .subscribe(
      (data: PaginationResult<Student[]>) => {
        this.students = data.result;
        this.pagination = data.pagination;
      },
      error => this.alertify.error(error)
    );
  }

  openModal(template: TemplateRef<any>, student: Student) {
    this.studentService.getStudent(student.id)
      .subscribe(
        (data: Student) => {
          this.student = data;
          this.editModalRef = this.modalService.show(template);
        },
        error => this.alertify.error(error)
      );
  }

  loadAfterHandle(page: number) {
    this.pagination.currentPage = page;
    this.loadStudents();
  }

  remove(student: Student) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + student.name,
      () => {
        this.studentService.delete(student.id).subscribe(
          (next) => {
            this.alertify.success('Delete ' + student.name + ' successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadStudents();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }

}
