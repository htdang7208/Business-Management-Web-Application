import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Interview } from 'src/app/_models/interview';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { InterviewService } from 'src/app/_services/interview.service';

@Component({
  selector: 'app-interview-add',
  templateUrl: './interview-add.component.html',
  styleUrls: ['./interview-add.component.css']
})
export class InterviewAddComponent implements OnInit {
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
