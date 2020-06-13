import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
  @Input() lastPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) companyForm: NgForm;

  constructor(private companyService: CompanyService,
              private alertify: AlertifyService) { }

  ngOnInit() {}

  submit() {
    this.companyService.add(this.companyForm.value).subscribe(
      (next) => {
        this.alertify.success('Add company successfully!');
        this.currentPageEmitter.emit(this.lastPage);
      },
      (error) => this.alertify.error(error)
    );
  }

}
