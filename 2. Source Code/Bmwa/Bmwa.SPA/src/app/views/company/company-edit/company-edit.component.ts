import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Company } from 'src/app/_models/company';
import { NgForm, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CompanyService } from 'src/app/_services/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  @Input() company: Company;
  @Input() currentPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('f', null) CompanyForm: NgForm;

  constructor(private companyService: CompanyService,
              private alertify: AlertifyService) { }
  ngOnDestroy(): void {
    this.CompanyForm.resetForm();
  }

  ngOnInit() {
  }

  submit() {
    this.companyService
      .update(this.company.id, this.CompanyForm.value)
      .subscribe(
        (next) => {
          this.alertify.success('Update company successfully!');
          this.currentPageEmitter.emit(this.currentPage);
        },
        (error) => this.alertify.error(error)
      );
  }
}
