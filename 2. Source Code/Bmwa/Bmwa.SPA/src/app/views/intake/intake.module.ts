import { NgModule } from '@angular/core';
import { IntakeComponent } from './intake.component';
import { IntakeListComponent } from './intake-list/intake-list.component';
import { IntakeRoutingModule } from './intake-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntakeService } from 'src/app/_services/intake.service';
import { IntakeListResolver } from 'src/app/_resolvers/intake/intake-list.resolver';
import { IntakeEditResolver } from 'src/app/_resolvers/intake/intake-edit.resolver';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [IntakeComponent, IntakeListComponent],
  imports: [
    IntakeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [IntakeService, IntakeListResolver, IntakeEditResolver]
})
export class IntakeModule {}
