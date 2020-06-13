import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../_models/pagination';
import { Company } from '../_models/company';
import { Observable, of } from 'rxjs';
import { CompanyService } from '../_services/company.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CompanyResolver implements Resolve<PaginationResult<Company[]>> {

    constructor(private companyService: CompanyService,
                private alertify: AlertifyService,
                private router: Router) {
    }
    resolve(): Observable<PaginationResult<Company[]>> {
        return this.companyService.getCompanies(1, 10)
            .pipe(
                catchError(
                    error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    }
                )
            );
    }
}
