import { Routes } from '@angular/router';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { HomeComponent } from './home/home.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'vehicle/create', component: VehicleCreateComponent,
        canDeactivate: [PreventUnsavedChanges] },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];
