import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { University } from 'src/app/_models/university';
import { NgForm } from '@angular/forms';
import { UniversityService } from 'src/app/_services/university.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-university-edit',
  templateUrl: './university-edit.component.html',
  styleUrls: ['./university-edit.component.css']
})
export class UniversityEditComponent implements OnInit, OnDestroy {
  @Input() university: University;
  @Input() currentPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) universityForm: NgForm;

  constructor(private universityService: UniversityService,
              private alertify: AlertifyService) { }
  ngOnDestroy(): void {
    this.universityForm.resetForm();
  }

  ngOnInit() {
  }

  submit() {
    this.universityService
      .update(this.university.id, this.universityForm.value)
      .subscribe(
        (next) => {
          this.alertify.success('Update university successfully!');
          this.currentPageEmitter.emit(this.currentPage);
        },
        (error) => this.alertify.error(error)
      );
  }
}
