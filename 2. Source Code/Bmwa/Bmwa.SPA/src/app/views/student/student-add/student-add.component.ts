import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InterviewService } from 'src/app/_services/interview.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  @Input() lastPage: number;
  @Output() lastPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) interviewForm: NgForm;

  constructor(private interviewService: InterviewService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submit() {
    this.interviewService.add(this.interviewForm.value)
    .subscribe(
      data => {
        this.alertify.success('Add ' + this.interviewForm.value.name + ' successfully');
        this.lastPageEmitter.emit(this.lastPage);
      },
      error => this.alertify.error(error)
    );
  }
}
