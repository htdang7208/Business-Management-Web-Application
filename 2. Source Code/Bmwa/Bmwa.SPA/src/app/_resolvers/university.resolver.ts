import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../_models/pagination';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { University } from '../_models/university';
import { UniversityService } from '../_services/university.service';

@Injectable()
export class UniversityResolver implements Resolve<PaginationResult<University[]>> {

    constructor(private universityService: UniversityService,
                private alertify: AlertifyService,
                private router: Router) {
    }
    resolve(): Observable<PaginationResult<University[]>> {
        return this.universityService.getUniversities()
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
