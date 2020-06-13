import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/_models/company';
import { Pagination } from 'src/app/_models/pagination';
import { CompanyService } from 'src/app/_services/company.service';
import { PageSizes } from 'src/app/_models/page-size';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  pagination: Pagination;
  nameFilter: string;
  addMode = false;
  editMode = false;
  currentCompanyId = -1;
  currentPage = 1;
  company: Company;
  pageSizes: PageSizes = new PageSizes();

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.companies = data['companies'].result;
        this.pagination = data['companies'].pagination;
      }
    );
  }
  loadCompanies() {
    this.companyService.getCompanies(this.pagination.currentPage, this.pagination.itemsPerPage, this.nameFilter)
      .subscribe(
        data => {
          this.companies = data.result;
          this.pagination = data.pagination;
        }
      );
  }
  resetFilter() {
    this.nameFilter = null;
    this.loadCompanies();
  }
  openAdd() {
    this.editMode = false;
    this.currentCompanyId = -1;
    this.addMode = !this.addMode;
  }

  openEdit(company: Company) {
    this.addMode = false;
    if (this.currentCompanyId !== company.id) {
      this.editMode = true;
      this.currentCompanyId = company.id;
      this.company = company;
    } else {
      this.editMode = false;
      this.currentCompanyId = -1;
    }
  }

  loadAfterChanged(currentPage: number) {
    this.pagination.currentPage = currentPage;
    this.loadCompanies();
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.currentPage = this.pagination.currentPage;
    this.loadCompanies();
  }
  removeCompany(company: Company) {
    this.alertify.confirm(
      'Notification',
      'Are you sure to delete : ' + company.name,
      () => {
        this.companyService.delete(company.id).subscribe(
          (next) => {
            this.alertify.success('Delete company successfully!');
            this.pagination.currentPage = this.currentPage;
            this.loadCompanies();
          },
          (error) => this.alertify.error(error)
        );
      }
    );
  }
}
