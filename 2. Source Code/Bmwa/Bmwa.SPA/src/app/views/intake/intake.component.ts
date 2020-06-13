import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intake } from 'src/app/_models/intake';
import { IntakeService } from 'src/app/_services/intake.service';
import { BsModalRef, BsModalService, BsDatepickerConfig } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css'],
})
export class IntakeComponent implements OnInit {
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  pageSizeList = [
    { value: '5', display: '5 items' },
    { value: '10', display: '10 items' },
    { value: '20', display: '20 items' },
    { value: '50', display: '50 items' },
  ];

  intakes: Intake[];
  intake: Intake;
  pagination: Pagination;

  filterForm: FormGroup;

  addMode = false;
  editMode = false;
  currentIntakeId = -1;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private intakeService: IntakeService,
    private alertify: AlertifyService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.intakes = data['intakes'].result;
      this.pagination = data['intakes'].pagination;
    });

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.createFilterForm();
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      weekAmount: new FormControl(null),
      dateBegin: new FormControl(null),
      dateEnd: new FormControl(null),
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.currentPage = this.pagination.currentPage;
    this.loadIntakes();
  }

  loadIntakes() {
    this.intakeService
      .getIntakes(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.filterForm.value
      )
      .subscribe(
        (response: PaginationResult<Intake[]>) => {
          this.intakes = response.result;
          this.pagination = response.pagination;
        },
        (error) => this.alertify.error(error)
      );
  }

  resetFilter() {
    this.filterForm.reset({
      name: null,
      weekAmount: null,
      dateBegin: null,
      dateEnd: null,
    });
    this.loadIntakes();
  }

  openAdd() {
    this.editMode = false;
    this.currentIntakeId = -1;
    this.addMode = !this.addMode;
  }

  openEdit(intake: Intake) {
    this.addMode = false;
    if (this.currentIntakeId !== intake.id) {
      this.editMode = true;
      this.currentIntakeId = intake.id;
      this.intake = intake;
    } else {
      this.editMode = false;
      this.currentIntakeId = -1;
    }
  }

  loadAfterChanged(currentPage: number) {
    this.pagination.currentPage = currentPage;
    this.loadIntakes();
  }

  removeIntake(intake: Intake) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + intake.name,
      () => {
        this.intakeService.deleteIntake(intake.id).subscribe(
          (next) => {
            this.alertify.success('Delete intake successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadIntakes();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
