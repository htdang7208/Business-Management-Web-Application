import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { StudentComponent } from './views/student/student.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'student', component: StudentComponent },
    { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },
    { path: 'intake', loadChildren: () => import('./views/intake/intake.module').then(m => m.IntakeModule) },
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {}