import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { VehicleCreateComponent } from './vehicle/vehicle-create/vehicle-create.component';
import { appRoutes } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './_services/alertify.service';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

@NgModule({
   declarations: [
      AppComponent,
      MenuComponent,
      HomeComponent,
      VehicleCreateComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),

   ],
   providers: [
      AlertifyService,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
