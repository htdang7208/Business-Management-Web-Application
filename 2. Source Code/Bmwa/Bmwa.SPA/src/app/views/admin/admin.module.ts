import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormsModule } from '@angular/forms';

import { AdminService } from 'src/app/_services/admin.service';
import { AdminDetailResolver } from 'src/app/_resolvers/admin-detail.resolver';
import { AdminListResolver } from 'src/app/_resolvers/admin-list.resolver';
import { AdminEditResolver } from 'src/app/_resolvers/admin-edit.resolver';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminListComponent,
    AdminCardComponent,
    AdminDetailComponent,
    AdminEditComponent
  ],
  imports: [
      CommonModule,
      TabsModule.forRoot(),
      NgxGalleryModule,
      FormsModule,
      AdminRoutingModule
    ],
  providers: [
    AdminService,
    AdminDetailResolver,
    AdminListResolver,
    AdminEditResolver
  ]
})
export class AdminModule {}
