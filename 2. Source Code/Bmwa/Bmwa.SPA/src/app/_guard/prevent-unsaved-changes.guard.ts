import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AdminEditComponent } from '../views/admin/admin-edit/admin-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<AdminEditComponent> {
    canDeactivate(component: AdminEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
