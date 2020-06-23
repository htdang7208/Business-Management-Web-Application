import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PaginationResult } from '../_models/pagination';
import { Interview } from '../_models/interview';
import { Injectable } from '@angular/core';
import { InterviewService } from '../_services/interview.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EducationProgram } from '../_models/education-program';
import { EducationProgramService } from '../_services/education-program.service';

@Injectable()
export class EducationProgramResolver implements Resolve<PaginationResult<EducationProgram[]>> {
    constructor(private educationProgramService: EducationProgramService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(): Observable<PaginationResult<EducationProgram[]>> {
        return this.educationProgramService.getEducationPrograms(1, 5)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
