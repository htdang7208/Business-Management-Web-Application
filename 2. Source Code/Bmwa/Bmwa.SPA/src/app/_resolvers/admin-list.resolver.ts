import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Admin } from '../_models/admin';
import { AdminService } from '../_services/admin.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationResult } from '../_models/pagination';


@Injectable()
export class AdminListResolver implements Resolve<PaginationResult<Admin[]>> {
    // set default for pagination
    pageNumber = 1;
    pageSize = 10;
    constructor(private adminService: AdminService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<Admin[]>> {
        return this.adminService.getAdmins(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
