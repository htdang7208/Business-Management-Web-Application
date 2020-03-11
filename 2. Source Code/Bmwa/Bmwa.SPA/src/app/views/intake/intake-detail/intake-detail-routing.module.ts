import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntakeDetailComponent } from './intake-detail.component';
import { ClassComponent } from './class/class.component';
import { InterviewComponent } from './interview/interview.component';
import { StudyProgrammingComponent } from './study-programming/study-programming.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TranieeComponent } from './traniee/traniee.component';
import { WorktrackComponent } from './worktrack/worktrack.component';

export const intakeDetailRoutes: Routes = [
  {
    // localhost:4200/intake/detail/
    path: '', component: IntakeDetailComponent,
    children: [
      {
        path: 'class', component: ClassComponent
      },
      {
        path: 'interview', component: InterviewComponent
      },
      {
        path: 'study-programming', component: StudyProgrammingComponent
      },
      {
        path: 'timetable', component: TimetableComponent
      },
      {
        path: 'trainee', component: TranieeComponent
      },
      {
        path: 'worktrack', component: WorktrackComponent
      },
      { path: '**', redirectTo: 'class', pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(intakeDetailRoutes)],
  exports: [RouterModule]
})
export class IntakeDetailRoutingModule {}
