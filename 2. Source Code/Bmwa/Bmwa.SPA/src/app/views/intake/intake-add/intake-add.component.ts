import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IntakeService } from 'src/app/_services/intake.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EducationProgramService } from 'src/app/_services/education-program.service';
import { EducationProgram } from 'src/app/_models/education-program';

@Component({
  selector: 'app-intake-add',
  templateUrl: './intake-add.component.html',
  styleUrls: ['./intake-add.component.css']
})
export class IntakeAddComponent implements OnInit {
  @Input() lastPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) intakeForm: NgForm;
  eduPrograms: EducationProgram[];
  eduProgId: number;

  constructor(private intakeService: IntakeService,
              private alertify: AlertifyService,
              private eduService: EducationProgramService) { }

  ngOnInit() {
    this.eduService.getAll()
    .subscribe(
      (data: EducationProgram[]) => {
        this.eduPrograms = data;
        this.eduProgId = data[0].id;
      },
      () => this.alertify.error('Cannot get education program list')
    );
  }

  submit() {
    // console.log(this.intakeForm.value);
    this.intakeService.addIntake(this.intakeForm.value).subscribe(
      () => {
        this.alertify.success('Add intake successfully!');
        this.currentPageEmitter.emit(this.lastPage);
      },
      (error) => this.alertify.error(error)
    );
  }

}
