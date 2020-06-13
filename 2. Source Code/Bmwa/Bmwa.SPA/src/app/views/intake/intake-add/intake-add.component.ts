import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { IntakeService } from 'src/app/_services/intake.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Intake } from 'src/app/_models/intake';

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

  constructor(private intakeService: IntakeService,
              private alertify: AlertifyService) { }

  ngOnInit() {}

  submit() {
    this.intakeService.addIntake(this.intakeForm.value).subscribe(
      (next) => {
        this.alertify.success('Add intake successfully!');
        this.currentPageEmitter.emit(this.lastPage);
      },
      (error) => this.alertify.error(error)
    );
  }

}
