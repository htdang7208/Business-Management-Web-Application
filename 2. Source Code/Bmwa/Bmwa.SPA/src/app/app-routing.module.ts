import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
// Login
import { LoginComponent } from './views/login/login.component';
// Dashboard
import { DashboardComponent } from './views/dashboard/dashboard.component';
// Resolver
import { AdminListResolver } from './_resolvers/admin-list.resolver';
import { AdminDetailResolver } from './_resolvers/admin-detail.resolver';
import { AdminEditResolver } from './_resolvers/admin-edit.resolver';
// Admin
import { AdminComponent } from './views/admin/admin.component';
import { AdminListComponent } from './views/admin/admin-list/admin-list.component';
import { AdminDetailComponent } from './views/admin/admin-detail/admin-detail.component';
import { AdminEditComponent } from './views/admin/admin-edit/admin-edit.component';
// Intake
import { IntakeComponent } from './views/intake/intake.component';
import { IntakeResolver } from './_resolvers/intake.resolver';
// Interview
import { InterviewComponent } from './views/interview/interview.component';
import { InterviewResolver } from './_resolvers/interview-resolver';
import { UniversityComponent } from './views/university/university.component';
import { UniversityResolver } from './_resolvers/university.resolver';
import { CompanyComponent } from './views/company/company.component';
import { CompanyResolver } from './_resolvers/company.resolver';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admins',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: AdminListComponent,
            resolve: { admins: AdminListResolver },
          },
          {
            path: ':id',
            component: AdminDetailComponent,
            resolve: { admin: AdminDetailResolver },
          },
          {
            path: ':id/edit',
            component: AdminEditComponent,
            resolve: { admin: AdminEditResolver },
            canDeactivate: [PreventUnsavedChanges],
          },
        ],
      },
      { path: 'intakes', component: IntakeComponent, resolve: { intakes: IntakeResolver} },
      { path: 'interviews', component: InterviewComponent, resolve: { interviews: InterviewResolver} },
      { path: 'companies', component: CompanyComponent, resolve: { companies: CompanyResolver} },
      { path: 'universities', component: UniversityComponent, resolve: { universities: UniversityResolver} }
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
