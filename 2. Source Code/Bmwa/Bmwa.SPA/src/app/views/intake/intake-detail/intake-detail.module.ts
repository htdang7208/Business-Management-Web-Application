import { NgModule } from '@angular/core';
import { ClassComponent } from './class/class.component';
import { InterviewComponent } from './interview/interview.component';
import { StudyProgrammingComponent } from './study-programming/study-programming.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TranieeComponent } from './traniee/traniee.component';
import { WorktrackComponent } from './worktrack/worktrack.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntakeDetailRoutingModule } from './intake-detail-routing.module';
import { IntakeDetailComponent } from './intake-detail.component';

@NgModule({
    declarations: [
        IntakeDetailComponent,
        ClassComponent,
        InterviewComponent,
        StudyProgrammingComponent,
        TimetableComponent,
        TranieeComponent,
        WorktrackComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        IntakeDetailRoutingModule
    ]
})
export class IntakeDetailModule {}
