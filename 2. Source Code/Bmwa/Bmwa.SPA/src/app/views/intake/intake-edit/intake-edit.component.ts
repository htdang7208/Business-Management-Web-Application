import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { IntakeService } from 'src/app/_services/intake.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Intake } from 'src/app/_models/intake';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-intake-edit',
  templateUrl: './intake-edit.component.html',
  styleUrls: ['./intake-edit.component.css']
})
export class IntakeEditComponent implements OnInit, OnDestroy {
  @Input() intake: Intake;
  @Input() currentPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) intakeForm: NgForm;

  constructor(private intakeService: IntakeService,
              private alertify: AlertifyService) { }
  ngOnDestroy(): void {
    this.intakeForm.resetForm();
  }

  ngOnInit() {
  }

  weekAmountValidator(c: FormControl) {
    return c.value <= 0 ? { errorValue: true } : null;
  }

  insertValidator(weekAmount: number) {
    this.intakeForm.controls.weekAmount.setValidators(this.weekAmountValidator.bind(this));
  }

  submit() {
    this.intakeService
      .updateIntake(this.intake.id, this.intakeForm.value)
      .subscribe(
        (next) => {
          this.alertify.success('Update intake successfully!');
          this.currentPageEmitter.emit(this.currentPage);
        },
        (error) => this.alertify.error(error)
      );
  }
}
