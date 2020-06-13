import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UniversityService } from 'src/app/_services/university.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-university-add',
  templateUrl: './university-add.component.html',
  styleUrls: ['./university-add.component.css']
})
export class UniversityAddComponent implements OnInit {
  @Input() lastPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) universityForm: NgForm;

  constructor(private universityService: UniversityService,
              private alertify: AlertifyService) { }

  ngOnInit() {}

  submit() {
    this.universityService.add(this.universityForm.value).subscribe(
      (next) => {
        this.alertify.success('Add university successfully!');
        this.currentPageEmitter.emit(this.lastPage);
      },
      (error) => this.alertify.error(error)
    );
  }

}
