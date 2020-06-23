// Import module
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// ngx-bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, ButtonsModule, BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

// Import service
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthGuard } from './_guard/auth.guard';
import { AlertifyService } from './_services/alertify.service';

// route
import { appRoutes, AppRoutingModule } from './app-routing.module';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { AppComponent } from './app.component';
import { NavComponent } from './views/nav/nav.component';

// Directive
import { DisableControlDirective } from './_directive/disableControl.directive';

// Login
import { LoginComponent } from './views/login/login.component';

// Dashboard
import { DashboardComponent } from './views/dashboard/dashboard.component';

// Admin
import { AdminComponent } from './views/admin/admin.component';
import { AdminCardComponent } from './views/admin/admin-card/admin-card.component';
import { AdminDetailComponent } from './views/admin/admin-detail/admin-detail.component';
import { AdminEditComponent } from './views/admin/admin-edit/admin-edit.component';
import { AdminListComponent } from './views/admin/admin-list/admin-list.component';
import { AdminRegisterComponent } from './views/admin/admin-register/admin-register.component';
import { PhotoEditorComponent } from './views/admin/photo-editor/photo-editor.component';
import { AdminService } from './_services/admin.service';
import { AdminDetailResolver } from './_resolvers/admin-detail.resolver';
import { AdminListResolver } from './_resolvers/admin-list.resolver';
import { AdminEditResolver } from './_resolvers/admin-edit.resolver';

// Intake
import { IntakeComponent } from './views/intake/intake.component';
import { IntakeResolver } from './_resolvers/intake.resolver';
import { IntakeAddComponent } from './views/intake/intake-add/intake-add.component';
import { IntakeEditComponent } from './views/intake/intake-edit/intake-edit.component';
import { IntakeService } from './_services/intake.service';

// Interview
import { InterviewComponent } from './views/interview/interview.component';
import { InterviewResolver } from './_resolvers/interview-resolver';
import { InterviewService } from './_services/interview.service';
import { InterviewAddComponent } from './views/interview/interview-add/interview-add.component';
import { InterviewEditComponent } from './views/interview/interview-edit/interview-edit.component';

// Student
import { StudentComponent } from './views/student/student.component';
import { StudentService } from './_services/student.service';
import { StudentAddComponent } from './views/student/student-add/student-add.component';
import { StudentEditComponent } from './views/student/student-edit/student-edit.component';
import { CompanyComponent } from './views/company/company.component';
import { UniversityComponent } from './views/university/university.component';
import { CompanyService } from './_services/company.service';
import { UniversityService } from './_services/university.service';
import { CompanyResolver } from './_resolvers/company.resolver';
import { UniversityResolver } from './_resolvers/university.resolver';
import { CompanyAddComponent } from './views/company/company-add/company-add.component';
import { CompanyEditComponent } from './views/company/company-edit/company-edit.component';
import { UniversityEditComponent } from './views/university/university-edit/university-edit.component';
import { UniversityAddComponent } from './views/university/university-add/university-add.component';
import { EducationProgramComponent } from './views/education-program/education-program.component';
import { SubjectComponent } from './views/subject/subject.component';
import { LecturerComponent } from './views/lecturer/lecturer.component';
import { EducationProgramAddComponent } from './views/education-program/education-program-add/education-program-add.component';
import { EducationProgramEditComponent } from './views/education-program/education-program-edit/education-program-edit.component';
import { EducationProgramViewComponent } from './views/education-program/education-program-view/education-program-view.component';
import { EducationProgramService } from './_services/education-program.service';
import { EducationProgramResolver } from './_resolvers/education-program.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

// note: now-angular v9 has error with
@NgModule({
  declarations: [
    DisableControlDirective,
    AppComponent,
    NavComponent,
    LoginComponent,
    // Admin
    AdminComponent,
    AdminCardComponent,
    AdminDetailComponent,
    AdminEditComponent,
    AdminListComponent,
    PhotoEditorComponent,
    AdminRegisterComponent,
    // Intake
    IntakeComponent,
    DashboardComponent,
    TimeAgoPipe,
    InterviewComponent,
    StudentComponent,
    IntakeAddComponent,
    IntakeEditComponent,
    InterviewAddComponent,
    InterviewEditComponent,
    StudentAddComponent,
    StudentEditComponent,
    CompanyComponent,
    UniversityComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    UniversityEditComponent,
    UniversityAddComponent,
    EducationProgramComponent,
    SubjectComponent,
    LecturerComponent,
    EducationProgramAddComponent,
    EducationProgramEditComponent,
    EducationProgramViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5200'],
        blacklistedRoutes: ['localhost:5200/api/auth'],
      },
    }),
    FormsModule,
    ReactiveFormsModule,

    // Additional
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    // Service
    AuthService,
    AdminService,
    IntakeService,
    InterviewService,
    StudentService,
    AlertifyService,
    CompanyService,
    UniversityService,
    EducationProgramService,
    // Resolver
    AdminDetailResolver,
    AdminListResolver,
    AdminEditResolver,
    IntakeResolver,
    InterviewResolver,
    CompanyResolver,
    UniversityResolver,
    EducationProgramResolver,
    //
    ErrorInterceptorProvider,
    AuthGuard,
    PreventUnsavedChanges,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
