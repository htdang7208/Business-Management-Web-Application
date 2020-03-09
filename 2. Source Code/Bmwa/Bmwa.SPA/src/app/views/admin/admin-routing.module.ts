import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';

import { AdminListResolver } from 'src/app/_resolvers/admin-list.resolver';
import { AdminEditResolver } from 'src/app/_resolvers/admin-edit.resolver';
import { AdminDetailResolver } from 'src/app/_resolvers/admin-detail.resolver';

import { PreventUnsavedChanges } from 'src/app/_guard/prevent-unsaved-changes.guard';

export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'list', component: AdminListComponent, resolve: { admins: AdminListResolver }
      },
      {
        path: ':id', component: AdminDetailComponent, resolve: { admin: AdminDetailResolver }
      },
      {
        path: ':id/edit', component: AdminEditComponent, resolve: { admin: AdminEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
