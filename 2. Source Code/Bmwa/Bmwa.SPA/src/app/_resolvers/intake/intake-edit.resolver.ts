import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Intake } from 'src/app/_models/intake';
import { IntakeService } from 'src/app/_services/intake.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IntakeEditResolver implements Resolve<Intake> {
    constructor(private intakeService: IntakeService,
                private router: Router,
                private alertify: AlertifyService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Intake> {
        return this.intakeService.getIntake(route.params['id'])
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/intake']);
                return of(null);
            })
        );
    }
}
