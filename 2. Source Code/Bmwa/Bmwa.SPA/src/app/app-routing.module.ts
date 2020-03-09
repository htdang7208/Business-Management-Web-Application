import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {}