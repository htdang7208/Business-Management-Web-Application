import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { IntakeService } from 'src/app/_services/intake.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Intake } from 'src/app/_models/intake';
import { EducationProgram } from 'src/app/_models/education-program';
import { EducationProgramService } from 'src/app/_services/education-program.service';

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
  eduPrograms: EducationProgram[];

  constructor(private intakeService: IntakeService,
              private alertify: AlertifyService,
              private eduService: EducationProgramService) { }
  ngOnDestroy(): void {
    this.intakeForm.resetForm();
  }

  ngOnInit() {
    this.eduService.getAll()
    .subscribe(
      (data: EducationProgram[]) => {
        this.eduPrograms = data;
      },
      () => this.alertify.error('Cannot get education program list')
    );
  }

  weekAmountValidator(c: FormControl) {
    return c.value <= 0 ? { errorValue: true } : null;
  }

  insertValidator() {
    this.intakeForm.controls.weekAmount.setValidators(this.weekAmountValidator.bind(this));
  }

  submit() {
    console.log(this.intakeForm.value);
    this.intakeService
      .updateIntake(this.intake.id, this.intakeForm.value)
      .subscribe(
        () => {
          this.alertify.success('Update intake successfully!');
          this.currentPageEmitter.emit(this.currentPage);
        },
        (error) => this.alertify.error(error)
      );
  }
}
