import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { VehicleCreateComponent } from '../vehicle/vehicle-create/vehicle-create.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<VehicleCreateComponent> {
    canDeactivate(component: VehicleCreateComponent) {
        if (component.createForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
