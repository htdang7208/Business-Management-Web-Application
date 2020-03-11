import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntakeComponent } from './intake.component';
import { IntakeListComponent } from './intake-list/intake-list.component';
import { IntakeListResolver } from 'src/app/_resolvers/intake/intake-list.resolver';

export const intakeRoutes: Routes = [
  {
    // localhost:4200/intake/
    path: '', component: IntakeComponent,
    children: [
      {
        path: 'list', component: IntakeListComponent, resolve: { intakes: IntakeListResolver}
      },
      {
        path: 'detail', loadChildren: () => import('./intake-detail/intake-detail.module').then(m => m.IntakeDetailModule)
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(intakeRoutes)],
  exports: [RouterModule]
})
export class IntakeRoutingModule {}
