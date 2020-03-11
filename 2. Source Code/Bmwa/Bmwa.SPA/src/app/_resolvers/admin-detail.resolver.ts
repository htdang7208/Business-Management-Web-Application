import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { Admin } from '../_models/admin';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AdminDetailResolver implements Resolve<Admin> {
    constructor(private adminService: AdminService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Admin> {
        return this.adminService.getAdmin(route.params['id'])
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/admin']);
                return of(null);
            })
        );
    }
}
