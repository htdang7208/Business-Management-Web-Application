import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Interview } from 'src/app/_models/interview';
import { InterviewService } from 'src/app/_services/interview.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css']
})
export class InterviewEditComponent implements OnInit {
  @Input() interview: Interview;
  @Input() currentPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) interviewForm: NgForm;
  constructor(private interviewService: InterviewService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  submit() {
    this.interviewService.update(this.interview.id, this.interviewForm.value)
    .subscribe(
      data => {
        this.alertify.success('Update ' + this.interview.name + ' successfully');
        this.currentPageEmitter.emit(this.currentPage);
      },
      error => this.alertify.error(error)
    );
  }
}
