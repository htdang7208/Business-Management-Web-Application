import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PaginationResult } from '../_models/pagination';
import { Interview } from '../_models/interview';
import { Injectable } from '@angular/core';
import { InterviewService } from '../_services/interview.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterviewResolver implements Resolve<PaginationResult<Interview[]>> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private interviewService: InterviewService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<Interview[]>> {
        return this.interviewService.getInterviews(this.pageNumber, this.pageSize)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
