import { Component, OnInit, TemplateRef } from '@angular/core';
import { Interview } from 'src/app/_models/interview';
import { InterviewService } from 'src/app/_services/interview.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  pageSizeList = [
    { value: '5', display: '5 items' },
    { value: '10', display: '10 items' },
    { value: '20', display: '20 items' },
    { value: '50', display: '50 items' },
  ];
  interviews: Interview[];
  interview: Interview;
  pagination: Pagination;
  currentPage: number;
  filterForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private interviewService: InterviewService,
              public studentService: StudentService,
              private alertify: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.interviews = data['interviews'].result;
        this.pagination = data['interviews'].pagination;
      }
    );
    this.createFilterForm();
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      date: new FormControl(null)
    });
  }

  resetFilter() {
    this.filterForm.reset({
      name: null,
      date: null,
    });
    this.loadInterviews();
  }
  onKeyup(event: any) {
    if (event.keyCode === 13) {
      this.loadInterviews();
    }
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.pagination.currentPage = event.page;
    this.loadInterviews();
  }

  loadInterviews() {
    this.interviewService
    .getInterviews(this.pagination.currentPage, this.pagination.itemsPerPage, this.filterForm.value)
    .subscribe(
      (data: PaginationResult<Interview[]>) => {
        this.interviews = data.result;
        this.pagination = data.pagination;
      },
      error => this.alertify.error('Cannot load interview list!')
    );
  }

  openModal(template: TemplateRef<any>, interview: Interview = null) {
    if (interview === null) {
      this.addModalRef = this.modalService.show(template);
      return;
    }
    this.editModalRef = this.modalService.show(template);
    this.interview = interview;
  }

  loadAfterHandle(page: number) {
    this.pagination.currentPage = page;
    this.loadInterviews();
  }

  remove(interview: Interview) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + interview.name,
      () => {
        this.interviewService.delete(interview.id).subscribe(
          (next) => {
            this.alertify.success('Delete ' + interview.name + ' successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadInterviews();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
